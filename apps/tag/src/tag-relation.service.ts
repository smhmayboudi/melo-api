import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  SearchType,
  TagAssignReqDto,
  TagFindOneRelationReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { TagRelationEntity } from "./tag-relation.entity";
import { TagRelationEntityRepository } from "./tag-relation.entity.repository";
import { TagRelationServiceInterface } from "./tag-relation.service.interface";

@Injectable()
// @PromInstanceCounter
export class TagRelationService implements TagRelationServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  transformTagRelation(dto: TagRelationEntity): TagRelationResDto {
    return {
      category: dto.category as SearchType,
      categoryId: dto.category_id,
      id: dto.id,
      tagId: dto.tag_id,
    };
  }

  constructor(
    @InjectRepository(TagRelationEntity)
    private readonly tagRelationEntityRepository: TagRelationEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async assign(dto: TagAssignReqDto): Promise<TagRelationResDto> {
    const assign = await this.tagRelationEntityRepository.save({
      category: dto.category,
      category_id: dto.categoryId,
      tag_id: dto.tagId,
    });
    return this.transformTagRelation(assign);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneRelation(
    dto: TagFindOneRelationReqDto
  ): Promise<TagRelationResDto | undefined> {
    const tagRelation = await this.tagRelationEntityRepository.findOne({
      id: dto.id,
    });
    if (tagRelation === undefined) {
      return undefined;
    }
    return this.transformTagRelation(tagRelation);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unassign(
    dto: TagUnassignReqDto
  ): Promise<TagRelationResDto | undefined> {
    const assign = await this.findOneRelation(dto);
    await this.tagRelationEntityRepository.delete({
      id: dto.id,
    });
    return assign;
  }
}
