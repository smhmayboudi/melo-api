import {
  DataPaginationResDto,
  RelationEntityReqDto,
  RelationEntityType,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationMultiHasResDto,
  RelationRemoveReqDto,
  RelationSetReqDto,
  RelationType,
} from "@melo/common";

import { RelationController } from "./relation.controller";
import { RelationService } from "./relation.service";
import { RelationServiceInterface } from "./relation.service.interface";
import { Test } from "@nestjs/testing";

describe("RelationController", () => {
  const date = new Date();
  const relation: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relationMultiHas: RelationMultiHasResDto = {
    from: { id: 0, type: RelationEntityType.album },
    relation: RelationType.follows,
    to: { id: 0, type: RelationEntityType.album },
  };
  const relationPagination: DataPaginationResDto<RelationEntityReqDto> = {
    results: [relation],
    total: 1,
  } as DataPaginationResDto<RelationEntityReqDto>;

  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<DataPaginationResDto<RelationEntityReqDto>> =>
      Promise.resolve(relationPagination),
    has: (): Promise<boolean> => Promise.resolve(true),
    multiHas: (): Promise<RelationMultiHasResDto[]> =>
      Promise.resolve([relationMultiHas]),
    remove: (): Promise<boolean> => Promise.resolve(true),
    set: (): Promise<boolean> => Promise.resolve(true),
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
      from: 0,
      fromEntityDto: {
        id: 0,
        type: RelationEntityType.album,
      },
      relationType: RelationType.follows,
      size: 0,
    };
    expect(await controller.get(dto)).toEqual(relationPagination);
  });

  it("has should equal to a relation", async () => {
    const dto: RelationHasReqDto = {
      from: { id: 0, type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, type: RelationEntityType.album },
    };
    expect(await controller.has(dto)).toEqual(true);
  });

  it("multiHas should equal to a relation", async () => {
    const dto: RelationMultiHasReqDto = {
      from: { id: 0, type: RelationEntityType.album },
      relationType: RelationType.follows,
      tos: [{ id: 0, type: RelationEntityType.album }],
    };
    expect(await controller.multiHas(dto)).toEqual([relationMultiHas]);
  });

  it("remove should equal to a relation", async () => {
    const dto: RelationRemoveReqDto = {
      from: { id: 0, name: undefined, type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, name: undefined, type: RelationEntityType.album },
    };
    expect(await controller.remove(dto)).toEqual(true);
  });

  it("set should equal to a relation", async () => {
    const dto: RelationSetReqDto = {
      createdAt: date,
      from: { id: 0, name: undefined, type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, name: undefined, type: RelationEntityType.album },
    };
    expect(await controller.set(dto)).toEqual(true);
  });
});
