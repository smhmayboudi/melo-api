import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Mutation, Request } from "dgraph-js";
import {
  RELATION_TYPE_ID_SEPARATOR,
  RelationEntityReqDto,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
} from "@melo/common";

import { DgraphService } from "@melo/dgraph";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { RelationServiceInterface } from "./relation.service.interface";

@Injectable()
// @PromInstanceCounter
export class RelationService implements RelationServiceInterface {
  private key(dto: RelationEntityReqDto): string {
    return `${dto.type}${RELATION_TYPE_ID_SEPARATOR}${dto.id}`;
  }
  private name(dto: RelationEntityReqDto): string {
    return dto.name === undefined ? this.key(dto) : dto.name;
  }

  constructor(private readonly dgraphService: DgraphService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: RelationGetReqDto): Promise<RelationResDto[]> {
    const query = `{
      relates(func: eq(id, "${this.key(dto.entity)}")) {
        uid
        ${dto.type}(offset: ${dto.from}, first: ${dto.size}) {
          id
        }
        count: count(${dto.type})
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
          result.relates[0][dto.type] === undefined
        ) {
          return [];
        }
        return result.relates[0][dto.type].map((value2) => {
          const [type, id] = value2.id.split(RELATION_TYPE_ID_SEPARATOR);
          return {
            from: dto.entity,
            to: {
              id: parseInt(id, 10),
              type,
            },
            type: dto.type,
          };
        });
      });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async has(dto: RelationHasReqDto): Promise<RelationResDto | undefined> {
    const query = `{
      hasRelate(func: eq(id, "${this.key(dto.from)}")) {
        uid
        name
        ${dto.type} @filter(eq(id, "${this.key(dto.to)}")) {
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
        return result !== undefined &&
          result[dto.type] !== undefined &&
          result[dto.type].length > 0
          ? dto
          : undefined;
      });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async multiHas(dto: RelationMultiHasReqDto): Promise<RelationResDto[]> {
    const query = `{
      hasRelate(func: eq(id, "${this.key(dto.from)}")) {
        uid
        name
        ${dto.type} @filter(${dto.tos
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
        if (result === undefined || result[dto.type] === undefined) {
          return [];
        }
        return result[dto.type].map((value2) => {
          const [type, id] = value2.id.split(RELATION_TYPE_ID_SEPARATOR);
          return {
            from: dto.from,
            to: {
              id: parseInt(id, 10),
              type: type,
            },
            type: dto.type,
          } as RelationResDto;
        });
      });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async remove(dto: RelationRemoveReqDto): Promise<RelationResDto> {
    const dtoFromId = this.key(dto.from);
    const dtoToId = this.key(dto.to);
    const mutation = new Mutation();
    const quads = [`uid(From) <${dto.type}> uid(To) .`];
    const request = new Request();
    const txn = this.dgraphService.client.newTxn();
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
    await txn.doRequest(request);
    return {
      from: dto.from,
      to: dto.to,
      type: dto.type,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async set(dto: RelationSetReqDto): Promise<RelationResDto> {
    const dtoFromId = this.key(dto.from);
    const dtoToId = this.key(dto.to);
    const mutation = new Mutation();
    const quads: string[] = [
      `uid(From) <id> "${dtoFromId}" .`,
      `uid(From) <name> "${this.name(dto.from)}" .`,
      `uid(To) <id> "${dtoToId}" .`,
      `uid(To) <name> "${this.name(dto.to)}" .`,
      `uid(From) <${dto.type}> uid(To) (date=${dto.createdAt.toISOString()}) .`,
    ];
    const request = new Request();
    const txn = this.dgraphService.client.newTxn();
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
    await txn.doRequest(request);
    return {
      from: dto.from,
      to: dto.to,
      type: dto.type,
    };
  }
}
