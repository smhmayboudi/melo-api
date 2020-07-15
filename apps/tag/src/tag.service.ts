import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  TagCreateReqDto,
  TagDeleteReqDto,
  TagFindOneReqDto,
  TagResDto,
  TagTagsReqDto,
} from "@melo/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { TagEntity } from "./tag.entity";
import { TagEntityRepository } from "./tag.entity.repository";
import { TagServiceInterface } from "./tag.service.interface";
import { TagUpdateReqDto } from "@melo/common/tag/dto/req/tag.update.req.dto";

@Injectable()
// @PromInstanceCounter
export class TagService implements TagServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  transformTag(dto: TagEntity): TagResDto {
    return {
      id: dto.id,
      name: dto.name,
      typeId: dto.type_id,
      value: dto.value,
    };
  }

  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntityRepository: TagEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async create(dto: TagCreateReqDto): Promise<TagResDto> {
    const tag = await this.tagEntityRepository.save({
      name: dto.name,
      type_id: dto.typeId,
      value: dto.value,
    });
    return this.transformTag(tag);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(dto: TagDeleteReqDto): Promise<TagResDto | undefined> {
    const tag = await this.findOne(dto);
    await this.tagEntityRepository.delete({ id: dto.id });
    return tag;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: TagFindOneReqDto): Promise<TagResDto | undefined> {
    const tag = await this.tagEntityRepository.findOne({
      id: dto.id,
    });
    if (tag === undefined) {
      return undefined;
    }
    return this.transformTag(tag);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async tags(dto: TagTagsReqDto): Promise<TagResDto[]> {
    const tags = await this.tagEntityRepository.find({
      skip: dto.from,
      take: dto.size,
    });
    return tags.map((value) => this.transformTag(value));
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async update(dto: TagUpdateReqDto): Promise<TagResDto | undefined> {
    await this.tagEntityRepository.update({ id: dto.id }, dto);
    return this.findOne(dto);
  }
}
