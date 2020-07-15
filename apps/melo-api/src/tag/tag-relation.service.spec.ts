import {
  SearchType,
  TAG_SERVICE,
  TagAssignReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";

import { TagRelationService } from "./tag-relation.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("TagRelationService", () => {
  const tagRelation: TagRelationResDto = {
    category: SearchType.album,
    categoryId: 0,
    id: 0,
    tagId: 0,
  };

  // TODO: interface ?
  const tagRelationClientProxyMock = {
    send: () => of(tagRelation),
  };

  let service: TagRelationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagRelationService,
        { provide: TAG_SERVICE, useValue: tagRelationClientProxyMock },
      ],
    }).compile();
    service = module.get<TagRelationService>(TagRelationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("assign should be equal to a tag relation", async () => {
    const dto: TagAssignReqDto = {
      category: SearchType.album,
      categoryId: 0,
      tagId: 0,
    };
    expect(await service.assign(dto)).toEqual(tagRelation);
  });

  it("unassign should be equal to a tag relation", async () => {
    const dto: TagUnassignReqDto = { id: 0 };
    expect(await service.unassign(dto)).toEqual(tagRelation);
  });
});
