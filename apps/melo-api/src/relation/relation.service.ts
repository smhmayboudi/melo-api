import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_HAS,
  RELATION_SERVICE_MULTI_HAS,
  RELATION_SERVICE_REMOVE,
  RELATION_SERVICE_SET,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
} from "@melo/common";

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { RelationServiceInterface } from "./relation.service.interface";

@Injectable()
// @PromInstanceCounter
export class RelationService implements RelationServiceInterface {
  constructor(
    @Inject(RELATION_SERVICE) private readonly relationClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: RelationGetReqDto): Promise<RelationResDto[]> {
    return this.relationClientProxy
      .send<RelationResDto[], RelationGetReqDto>(RELATION_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async has(dto: RelationHasReqDto): Promise<RelationResDto | undefined> {
    return this.relationClientProxy
      .send<RelationResDto | undefined, RelationHasReqDto>(
        RELATION_SERVICE_HAS,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async multiHas(dto: RelationMultiHasReqDto): Promise<RelationResDto[]> {
    return this.relationClientProxy
      .send<RelationResDto[], RelationMultiHasReqDto>(
        RELATION_SERVICE_MULTI_HAS,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async remove(dto: RelationRemoveReqDto): Promise<RelationResDto> {
    return this.relationClientProxy
      .send<RelationResDto, RelationRemoveReqDto>(RELATION_SERVICE_REMOVE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async set(dto: RelationSetReqDto): Promise<RelationResDto> {
    return this.relationClientProxy
      .send<RelationResDto, RelationSetReqDto>(RELATION_SERVICE_SET, dto)
      .toPromise();
  }
}
