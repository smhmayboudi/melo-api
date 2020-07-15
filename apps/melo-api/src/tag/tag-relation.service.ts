import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  TAG_RELATION_SERVICE_ASSIGN,
  TAG_RELATION_SERVICE_UNASSIGN,
  TAG_SERVICE,
  TagAssignReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { TagRelationServiceInterface } from "./tag-relation.service.interface";

@Injectable()
// @PromInstanceCounter
export class TagRelationService implements TagRelationServiceInterface {
  constructor(
    @Inject(TAG_SERVICE) private readonly tagRelationClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async assign(dto: TagAssignReqDto): Promise<TagRelationResDto> {
    return this.tagRelationClientProxy
      .send<TagRelationResDto, TagAssignReqDto>(
        TAG_RELATION_SERVICE_ASSIGN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unassign(
    dto: TagUnassignReqDto
  ): Promise<TagRelationResDto | undefined> {
    return this.tagRelationClientProxy
      .send<TagRelationResDto | undefined, TagUnassignReqDto>(
        TAG_RELATION_SERVICE_UNASSIGN,
        dto
      )
      .toPromise();
  }
}
