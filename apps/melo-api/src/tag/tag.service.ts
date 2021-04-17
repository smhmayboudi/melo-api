import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  TAG_SERVICE,
  TAG_SERVICE_CREATE,
  TAG_SERVICE_DELETE,
  TAG_SERVICE_TAGS,
  TAG_SERVICE_UPDATE,
  TagCreateReqDto,
  TagDeleteReqDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { TagServiceInterface } from "./tag.service.interface";

@Injectable()
// @PromInstanceCounter
export class TagService implements TagServiceInterface {
  constructor(
    @Inject(TAG_SERVICE) private readonly tagClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async create(dto: TagCreateReqDto): Promise<TagResDto> {
    return this.tagClientProxy
      .send<TagResDto, TagCreateReqDto>(TAG_SERVICE_CREATE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(dto: TagDeleteReqDto): Promise<TagResDto | undefined> {
    return this.tagClientProxy
      .send<TagResDto | undefined, TagDeleteReqDto>(TAG_SERVICE_DELETE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async tags(dto: TagTagsReqDto): Promise<TagResDto[]> {
    return this.tagClientProxy
      .send<TagResDto[], TagTagsReqDto>(TAG_SERVICE_TAGS, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async update(dto: TagUpdateReqDto): Promise<TagResDto | undefined> {
    return this.tagClientProxy
      .send<TagResDto | undefined, TagUpdateReqDto>(TAG_SERVICE_UPDATE, dto)
      .toPromise();
  }
}
