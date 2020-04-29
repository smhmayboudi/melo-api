import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { Mutation, Request, Txn } from "dgraph-js";

import { DgraphService } from "../dgraph/dgraph.service";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationServiceInterface } from "./relation.service.interface";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";

@Injectable()
// @PromInstanceCounter
export class RelationService implements RelationServiceInterface {
  constructor(private readonly dgraphService: DgraphService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(
    dto: RelationGetReqDto
  ): Promise<RelationPaginationResDto<RelationEntityResDto>> {
    const query = `{
      relates(func: eq(id, "${dto.fromEntityDto.type}_${dto.fromEntityDto.id}")) {
        uid
        ${dto.relationType}(offset: ${dto.from}, first: ${dto.limit}) {
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
        // TODO: Should we define node elements before make mutations?
        // If we don`t make we should move !result.relates[0] to top lines
        if (
          result.relates[0] === undefined ||
          result.relates[0][dto.relationType] === undefined
        ) {
          return {
            results: [] as RelationEntityResDto[],
            total: 0,
          } as RelationPaginationResDto<RelationEntityResDto>;
        }
        return {
          results: result.relates[0][dto.relationType].map((value2) => {
            const [type, id] = value2.id.split("_");
            return {
              id: parseInt(id, 10),
              type,
            };
          }),
          total: result.relates[0].count,
        } as RelationPaginationResDto<RelationEntityResDto>;
      });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async has(dto: RelationHasReqDto): Promise<boolean> {
    const query = `{
      hasRelate(func: eq(id, "${dto.from.type}_${dto.to.id}")) {
        uid
        name
        ${dto.relationType} @filter(eq(id, "${dto.from.type}_${dto.to.id}")) {
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
      hasRelate(func: eq(id, "${dto.from.type}_${dto.from.id}")) {
        uid
        name
        ${dto.relationType} @filter(${dto.tos
      .map((value) => `eq(id, "${value.type}_${value.id}")`)
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
          const [type, id] = value2.id.split("_");
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
    const request: Request = new Request();
    request.setQuery(`
      query {
        var(func: eq(id, "${dto.from.type}_${dto.from.id}")) {
          From as uid
        }
        var(func: eq(id, "${dto.to.type}_${dto.to.id}")) {
          To as uid
        }
      }
    `);
    const txn: Txn = this.dgraphService.client.newTxn();
    const mutation: Mutation = new Mutation();
    if (dto.from.name === undefined) {
      dto.from.name = `${dto.from.type}_${dto.from.id}`;
    }
    if (dto.to.name === undefined) {
      dto.to.name = `${dto.to.type}_${dto.to.id}`;
    }
    const quads = [`uid(From) <${dto.relationType}> uid(To) .`];
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
    const request: Request = new Request();
    request.setQuery(`
    query {
      var(func: eq(id, "${dto.from.type}_${dto.from.id}")) {
        From as uid
      }
      var(func: eq(id, "${dto.to.type}_${dto.to.id}")) {
        To as uid
      }
    }`);

    const txn: Txn = this.dgraphService.client.newTxn();
    const mutation: Mutation = new Mutation();
    if (!dto.from.name) {
      dto.from.name = `${dto.from.type}_${dto.from.id}`;
    }
    if (!dto.to.name) {
      dto.to.name = `${dto.to.type}_${dto.to.id}`;
    }
    const quads: string[] = [
      `uid(From) <id> "${dto.from.type}_${dto.from.id}" .`,
      `uid(From) <name> "${dto.from.name}" .`,
      `uid(To) <id> "${dto.to.type}_${dto.to.id}" .`,
      `uid(To) <name> "${dto.to.name}" .`,
      `uid(From) <${
        dto.relationType
      }> uid(To) (date=${dto.createdAt.toISOString()}) .`,
    ];
    mutation.setSetNquads(quads.join("\n"));
    request.setMutationsList([mutation]);
    request.setCommitNow(true);
    return txn.doRequest(request).then((_value) => {
      return true;
    });
  }
}
