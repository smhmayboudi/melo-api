import {
  DataPaginationResDto,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_HAS,
  RELATION_SERVICE_MULTI_HAS,
  RELATION_SERVICE_REMOVE,
  RELATION_SERVICE_SET,
  RelationEntityReqDto,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationMultiHasResDto,
  RelationRemoveReqDto,
  RelationSetReqDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { RelationService } from "./relation.service";

@Controller()
export class RelationController {
  constructor(private readonly relationService: RelationService) {}

  @MessagePattern(RELATION_SERVICE_GET)
  get(
    @Payload()
    dto: RelationGetReqDto
  ): Promise<DataPaginationResDto<RelationEntityReqDto>> {
    return this.relationService.get(dto);
  }

  @MessagePattern(RELATION_SERVICE_HAS)
  has(@Payload() dto: RelationHasReqDto): Promise<boolean> {
    return this.relationService.has(dto);
  }

  @MessagePattern(RELATION_SERVICE_MULTI_HAS)
  multiHas(
    @Payload() dto: RelationMultiHasReqDto
  ): Promise<RelationMultiHasResDto[]> {
    return this.relationService.multiHas(dto);
  }

  @MessagePattern(RELATION_SERVICE_REMOVE)
  remove(@Payload() dto: RelationRemoveReqDto): Promise<boolean> {
    return this.relationService.remove(dto);
  }

  @MessagePattern(RELATION_SERVICE_SET)
  set(@Payload() dto: RelationSetReqDto): Promise<boolean> {
    return this.relationService.set(dto);
  }
}
