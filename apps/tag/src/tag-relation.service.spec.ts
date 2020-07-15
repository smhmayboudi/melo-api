import {
  SearchType,
  TagAssignReqDto,
  TagFindOneRelationReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";

import { DeleteResult } from "typeorm";
import { TagRelationEntity } from "./tag-relation.entity";
import { TagRelationEntityRepository } from "./tag-relation.entity.repository";
import { TagRelationEntityRepositoryInterface } from "./tag-relation.entity.repository.interface";
import { TagRelationService } from "./tag-relation.service";
import { Test } from "@nestjs/testing";

describe("TagRelationService", () => {
  const deleteResult: DeleteResult = {
    raw: "",
  };
  const tagRelation: TagRelationResDto = {
    category: SearchType.album,
    categoryId: 0,
    id: 0,
    tagId: 0,
  };
  const tagRelationEntity: TagRelationEntity = {
    category: SearchType.album,
    category_id: 0,
    id: 0,
    tag_id: 0,
  };

  const tagRelationEntityRepositoryMock: TagRelationEntityRepositoryInterface = {
    delete: () => Promise.resolve(deleteResult),
    find: () => Promise.resolve([tagRelationEntity]),
    findOne: () => Promise.resolve(tagRelationEntity),
    save: <TagRelationEntity>(): Promise<TagRelationEntity> =>
      (Promise.resolve(tagRelationEntity) as unknown) as Promise<
        TagRelationEntity
      >,
  };

  let service: TagRelationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagRelationService,
        {
          provide: TagRelationEntityRepository,
          useValue: tagRelationEntityRepositoryMock,
        },
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

  it("findOneRelation should be equal to a tag relation", async () => {
    const dto: TagFindOneRelationReqDto = { id: 0 };
    expect(await service.findOneRelation(dto)).toEqual(tagRelation);
  });

  it("findOneRelation should be undefined", async () => {
    const tagRelationEntityRepositoryMockFindOne: TagRelationEntityRepositoryInterface = {
      ...tagRelationEntityRepositoryMock,
      findOne: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        TagRelationService,
        {
          provide: TagRelationEntityRepository,
          useValue: tagRelationEntityRepositoryMockFindOne,
        },
      ],
    }).compile();
    service = module.get<TagRelationService>(TagRelationService);
    const dto: TagFindOneRelationReqDto = { id: 0 };
    expect(await service.findOneRelation(dto)).toBeUndefined();
  });

  it("unassign should be equal to a tag relation", async () => {
    const dto: TagUnassignReqDto = { id: 0 };
    expect(await service.unassign(dto)).toEqual(tagRelation);
  });
});
