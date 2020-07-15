import { DeleteResult, UpdateResult } from "typeorm";
import {
  TagCreateReqDto,
  TagDeleteReqDto,
  TagFindOneReqDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";

import { TagEntity } from "./tag.entity";
import { TagEntityRepository } from "./tag.entity.repository";
import { TagEntityRepositoryInterface } from "./tag.entity.repository.interface";
import { TagService } from "./tag.service";
import { Test } from "@nestjs/testing";

describe("TagService", () => {
  const deleteResult: DeleteResult = {
    raw: "",
  };
  const tag: TagResDto = {
    id: 0,
    name: "",
    typeId: 0,
    value: "",
  };
  const tagEntity: TagEntity = {
    id: 0,
    name: "",
    type_id: 0,
    value: "",
  };
  const updateResult: UpdateResult = {
    generatedMaps: [{}],
    raw: "",
  };

  const tagEntityRepositoryMock: TagEntityRepositoryInterface = {
    delete: () => Promise.resolve(deleteResult),
    find: () => Promise.resolve([tagEntity]),
    findOne: () => Promise.resolve(tagEntity),
    save: <TagEntity>(): Promise<TagEntity> =>
      (Promise.resolve(tagEntity) as unknown) as Promise<TagEntity>,
    update: () => Promise.resolve(updateResult),
  };

  let service: TagService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: TagEntityRepository, useValue: tagEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<TagService>(TagService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create should be equal to a tag", async () => {
    const dto: TagCreateReqDto = {
      name: "",
      typeId: 0,
      value: "",
    };
    expect(await service.create(dto)).toEqual(tag);
  });

  it("delete should be equal to a tag", async () => {
    const dto: TagDeleteReqDto = { id: 0 };
    expect(await service.delete(dto)).toEqual(tag);
  });

  it("findOne should be equal to a tag", async () => {
    const dto: TagFindOneReqDto = { id: 0 };
    expect(await service.findOne(dto)).toEqual(tag);
  });

  it("findOne should be undefined ", async () => {
    const tagEntityRepositoryMockFindOne: TagEntityRepositoryInterface = {
      ...tagEntityRepositoryMock,
      findOne: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: TagEntityRepository,
          useValue: tagEntityRepositoryMockFindOne,
        },
      ],
    }).compile();
    service = module.get<TagService>(TagService);
    const dto: TagFindOneReqDto = { id: 0 };
    expect(await service.findOne(dto)).toBeUndefined();
  });

  it("tags should be equal to an array of tags", async () => {
    const dto: TagTagsReqDto = { from: 0, size: 0 };
    expect(await service.tags(dto)).toEqual([tag]);
  });

  it("update should be equal to a tag", async () => {
    const dto: TagUpdateReqDto = { id: 0, name: "", typeId: 0, value: "" };
    expect(await service.update(dto)).toEqual(tag);
  });
});
