import {
  SearchType,
  TagAssignReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";

import { TagRelationController } from "./tag-relation.controller";
import { TagRelationService } from "./tag-relation.service";
import { TagRelationServiceInterface } from "./tag-relation.service.interface";
import { Test } from "@nestjs/testing";

describe("TagRelationController", () => {
  const tagRelation: TagRelationResDto = {
    category: SearchType.album,
    categoryId: 0,
    id: 0,
    tagId: 0,
  };

  const tagRelationServiceMock: TagRelationServiceInterface = {
    assign: () => Promise.resolve(tagRelation),
    findOneRelation: () => Promise.resolve(tagRelation),
    unassign: () => Promise.resolve(tagRelation),
  };

  let controller: TagRelationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagRelationController],
      providers: [
        { provide: TagRelationService, useValue: tagRelationServiceMock },
      ],
    }).compile();
    controller = module.get<TagRelationController>(TagRelationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("assign should be equal to a tag relation", async () => {
    const dto: TagAssignReqDto = {
      category: SearchType.album,
      categoryId: 0,
      tagId: 0,
    };
    expect(await controller.assign(dto)).toEqual(tagRelation);
  });

  it("unassign should be equal to a tag relation", async () => {
    const dto: TagUnassignReqDto = { id: 0 };
    expect(await controller.unassign(dto)).toEqual(tagRelation);
  });
});
