import {
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_MULTI_HAS,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
} from "@melo/common";

import { RelationService } from "./relation.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("RelationService", () => {
  const date = new Date();
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const to: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relation: RelationResDto = {
    from,
    to,
    type: RelationEdgeType.follows,
  };
  const entity: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };

  // TODO: interface ?
  const relationClientProxyMock = {
    send: (token: string) =>
      token === RELATION_SERVICE_GET
        ? of([relation])
        : token === RELATION_SERVICE_MULTI_HAS
        ? of([relation])
        : of(relation),
  };

  let service: RelationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("get should be equal a value", async () => {
    const dto: RelationGetReqDto = {
      entity,
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
    };
    expect(await service.get(dto)).toEqual([relation]);
  });

  it("has should be equal to a value", async () => {
    const dto: RelationHasReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.has(dto)).toEqual(dto);
  });

  it("multiHas should be equal to a value", async () => {
    const dto: RelationMultiHasReqDto = {
      from,
      tos: [entity],
      type: RelationEdgeType.follows,
    };
    expect(await service.multiHas(dto)).toEqual([relation]);
  });

  it("remove should be equal to a value", async () => {
    const dto: RelationRemoveReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.remove(dto)).toEqual(relation);
  });

  it("set should be equal to a value", async () => {
    const dto: RelationSetReqDto = {
      createdAt: date,
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.set(dto)).toEqual(relation);
  });
});
