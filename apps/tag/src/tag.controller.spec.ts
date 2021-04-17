import {
  TagCreateReqDto,
  TagDeleteReqDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";

import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TagServiceInterface } from "./tag.service.interface";
import { Test } from "@nestjs/testing";

describe("TagController", () => {
  const tag: TagResDto = {
    id: 0,
    name: "",
    typeId: 0,
    value: "",
  };

  const tagServiceMock: TagServiceInterface = {
    create: () => Promise.resolve(tag),
    delete: () => Promise.resolve(tag),
    findOne: () => Promise.resolve(tag),
    tags: () => Promise.resolve([tag]),
    update: () => Promise.resolve(tag),
  };

  let controller: TagController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagController],
      providers: [{ provide: TagService, useValue: tagServiceMock }],
    }).compile();
    controller = module.get<TagController>(TagController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("create should be equal to a tag", async () => {
    const dto: TagCreateReqDto = {
      name: "",
      typeId: 0,
      value: "",
    };
    expect(await controller.create(dto)).toEqual(tag);
  });

  it("delete should be equal to a tag", async () => {
    const dto: TagDeleteReqDto = { id: 0 };
    expect(await controller.delete(dto)).toEqual(tag);
  });

  it("tags should be equal to an array of tags", async () => {
    const dto: TagTagsReqDto = { from: 0, size: 0 };
    expect(await controller.tags(dto)).toEqual([tag]);
  });

  it("update should be equal to a tag", async () => {
    const dto: TagUpdateReqDto = { id: 0, name: "", typeId: 0, value: "" };
    expect(await controller.update(dto)).toEqual(tag);
  });
});
