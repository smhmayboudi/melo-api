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
  const relationMultiHas: RelationResDto = {
    from,
    to: {
      id: 0,
      type: RelationEntityType.user,
    },
    type: RelationEdgeType.follows,
  };

  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationResDto[]> => Promise.resolve([relationMultiHas]),
    has: (): Promise<RelationResDto | undefined> =>
      Promise.resolve(relationMultiHas),
    multiHas: (): Promise<RelationResDto[]> =>
      Promise.resolve([relationMultiHas]),
    remove: (): Promise<RelationResDto> => Promise.resolve(relationMultiHas),
    set: (): Promise<RelationResDto> => Promise.resolve(relationMultiHas),
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
      entity: {
        id: 0,
        type: RelationEntityType.user,
      },
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
    };
    expect(await controller.get(dto)).toEqual([relationMultiHas]);
  });

  it("has should equal to a relation", async () => {
    const dto: RelationHasReqDto = {
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      to: {
        id: 0,
        type: RelationEntityType.user,
      },
      type: RelationEdgeType.follows,
    };
    expect(await controller.has(dto)).toEqual(dto);
  });

  it("multiHas should equal to a relation", async () => {
    const dto: RelationMultiHasReqDto = {
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      tos: [
        {
          id: 0,
          type: RelationEntityType.user,
        },
      ],
      type: RelationEdgeType.follows,
    };
    expect(await controller.multiHas(dto)).toEqual([relationMultiHas]);
  });

  it("remove should equal to a relation", async () => {
    const dto: RelationRemoveReqDto = {
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      to: {
        id: 0,
        type: RelationEntityType.user,
      },
      type: RelationEdgeType.follows,
    };
    expect(await controller.remove(dto)).toEqual({
      from: dto.from,
      to: dto.to,
      type: dto.type,
    });
  });

  it("set should equal to a relation", async () => {
    const dto: RelationSetReqDto = {
      createdAt: date,
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      to: {
        id: 0,
        type: RelationEntityType.user,
      },
      type: RelationEdgeType.follows,
    };
    expect(await controller.set(dto)).toEqual({
      from: dto.from,
      to: dto.to,
      type: dto.type,
    });
  });
});
