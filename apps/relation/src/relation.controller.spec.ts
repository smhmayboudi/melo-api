import {
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

import { RelationController } from "./relation.controller";
import { RelationService } from "./relation.service";
import { RelationServiceInterface } from "./relation.service.interface";
import { Test } from "@nestjs/testing";

describe("RelationController", () => {
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

  const relationServiceMock: RelationServiceInterface = {
    get: () => Promise.resolve([relation]),
    has: () => Promise.resolve(relation),
    multiHas: () => Promise.resolve([relation]),
    remove: () => Promise.resolve(relation),
    set: () => Promise.resolve(relation),
  };

  let controller: RelationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RelationController],
      providers: [
        {
          provide: RelationService,
          useValue: relationServiceMock,
        },
      ],
    }).compile();
    controller = module.get<RelationController>(RelationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("get should equal to a relation", async () => {
    const dto: RelationGetReqDto = {
      entity,
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
    };
    expect(await controller.get(dto)).toEqual([relation]);
  });

  it("has should equal to a relation", async () => {
    const dto: RelationHasReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await controller.has(dto)).toEqual(dto);
  });

  it("multiHas should equal to a relation", async () => {
    const dto: RelationMultiHasReqDto = {
      from,
      tos: [entity],
      type: RelationEdgeType.follows,
    };
    expect(await controller.multiHas(dto)).toEqual([relation]);
  });

  it("remove should equal to a relation", async () => {
    const dto: RelationRemoveReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await controller.remove(dto)).toEqual(relation);
  });

  it("set should equal to a relation", async () => {
    const dto: RelationSetReqDto = {
      createdAt: date,
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await controller.set(dto)).toEqual(relation);
  });
});
