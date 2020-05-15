import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Mutation, Request, Txn } from "dgraph-js";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DgraphService } from "@melo/dgraph";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationServiceInterface } from "./relation.service.interface";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";
import { TYPE_ID_SEPARATOR } from "./relation.constant";

@Injectable()
// @PromInstanceCounter
export class RelationService implements RelationServiceInterface {
  private key(dto: RelationEntityResDto): string {
    return `${dto.type}${TYPE_ID_SEPARATOR}${dto.id}`;
  }

  constructor(private readonly dgraphService: DgraphService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(
    dto: RelationGetReqDto
  ): Promise<DataPaginationResDto<RelationEntityResDto>> {
    const query = `{
      relates(func: eq(id, "${this.key(dto.fromEntityDto)}")) {
        uid
        ${dto.relationType}(offset: ${dto.from}, first: ${dto.size}) {
          id
        }
        count: count(${dto.relationType})
      }
    }`;
    return this.dgraphService.client
      .newTxn()
      .queryWithVars(query)
      .then((value) => {
        const result = value.getJson();
        if (result === undefined) {
          throw new Error();
        }
        if (
          result.relates[0] === undefined ||
          result.relates[0][dto.relationType] === undefined
        ) {
          return {
            results: [] as RelationEntityResDto[],
            total: 0,
          } as DataPaginationResDto<RelationEntityResDto>;
        }
        return {
          results: result.relates[0][dto.relationType].map((value2) => {
            const [type, id] = value2.id.split(TYPE_ID_SEPARATOR);
            return {
              id: parseInt(id, 10),
              type,
            };
          }),
          total: result.relates[0].count,
        } as DataPaginationResDto<RelationEntityResDto>;
      });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async has(dto: RelationHasReqDto): Promise<boolean> {
    const query = `{
      hasRelate(func: eq(id, "${this.key(dto.from)}")) {
        uid
        name
        ${dto.relationType} @filter(eq(id, "${this.key(dto.to)}")) {
          id
          name
        }
      }
    }`;
    return this.dgraphService.client
      .newTxn()
      .queryWithVars(query)
      .then((value) => {
        const result = value.getJson().hasRelate[0] as
          | {
              [key: string]: { id: string }[];
            }
          | undefined;
        return (
          result !== undefined &&
          result[dto.relationType] !== undefined &&
          result[dto.relationType].length > 0
        );
      });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async multiHas(
    dto: RelationMultiHasReqDto
  ): Promise<RelationMultiHasResDto[]> {
    const query = `{
      hasRelate(func: eq(id, "${this.key(dto.from)}")) {
        uid
        name
        ${dto.relationType} @filter(${dto.tos
      .map((value) => `eq(id, "${this.key(value)}")`)
      .join(" or ")}) {
          id
          name
        }
      }
    }`;
    return this.dgraphService.client
      .newTxn()
      .queryWithVars(query)
      .then((value) => {
        const result = value.getJson().hasRelate[0] as
          | {
              [key: string]: { id: string }[];
            }
          | undefined;
        if (result === undefined || result[dto.relationType] === undefined) {
          return [] as RelationMultiHasResDto[];
        }
        return result[dto.relationType].map((value2) => {
          const [type, id] = value2.id.split(TYPE_ID_SEPARATOR);
          return {
            from: dto.from,
            relation: dto.relationType,
            to: {
              id: parseInt(id, 10),
              type: type,
            },
          } as RelationMultiHasResDto;
        });
      });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async remove(dto: RelationRemoveReqDto): Promise<boolean> {
    const dtoFromId = this.key(dto.from);
    const dtoToId = this.key(dto.to);
    const mutation: Mutation = new Mutation();
    const quads = [`uid(From) <${dto.relationType}> uid(To) .`];
    const request: Request = new Request();
    const txn: Txn = this.dgraphService.client.newTxn();
    request.setQuery(`
      query {
        var(func: eq(id, "${dtoFromId}")) {
          From as uid
        }
        var(func: eq(id, "${dtoToId}")) {
          To as uid
        }
      }
    `);
    mutation.setDelNquads(quads.join("\n"));
    request.setMutationsList([mutation]);
    request.setCommitNow(true);
    return txn.doRequest(request).then((_value) => {
      return true;
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async set(dto: RelationSetReqDto): Promise<boolean> {
    const dtoFromId = this.key(dto.from);
    const dtoToId = this.key(dto.to);
    const mutation: Mutation = new Mutation();
    const quads: string[] = [
      `uid(From) <id> "${dtoFromId}" .`,
      `uid(From) <name> "${
        dto.from.name === undefined ? dtoFromId : dto.from.name
      }" .`,
      `uid(To) <id> "${dtoToId}" .`,
      `uid(To) <name> "${dto.to.name === undefined ? dtoToId : dto.to.name}" .`,
      `uid(From) <${
        dto.relationType
      }> uid(To) (date=${dto.createdAt.toISOString()}) .`,
    ];
    const request: Request = new Request();
    const txn: Txn = this.dgraphService.client.newTxn();
    mutation.setSetNquads(quads.join("\n"));
    request.setQuery(`
    query {
      var(func: eq(id, "${dtoFromId}")) {
        From as uid
      }
      var(func: eq(id, "${dtoToId}")) {
        To as uid
      }
    }`);
    request.setMutationsList([mutation]);
    request.setCommitNow(true);
    return txn.doRequest(request).then((_value) => {
      return true;
    });
  }
}
