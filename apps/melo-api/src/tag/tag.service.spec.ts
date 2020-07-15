import {
  TAG_SERVICE,
  TAG_SERVICE_TAGS,
  TagCreateReqDto,
  TagDeleteReqDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";

import { TagService } from "./tag.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("TagService", () => {
  const tag: TagResDto = {
    id: 0,
    name: "",
    typeId: 0,
    value: "",
  };

  // TODO: interface ?
  const tagClientProxyMock = {
    send: (token: string) => (token === TAG_SERVICE_TAGS ? of([tag]) : of(tag)),
  };

  let service: TagService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: TAG_SERVICE, useValue: tagClientProxyMock },
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

  it("tags should be equal to an array of tags", async () => {
    const dto: TagTagsReqDto = { from: 0, size: 0 };
    expect(await service.tags(dto)).toEqual([tag]);
  });

  it("update should be equal to a tag", async () => {
    const dto: TagUpdateReqDto = { id: 0, name: "", typeId: 0, value: "" };
    expect(await service.update(dto)).toEqual(tag);
  });
});
