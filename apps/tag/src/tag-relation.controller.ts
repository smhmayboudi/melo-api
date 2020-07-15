import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  TAG_RELATION_SERVICE_ASSIGN,
  TAG_RELATION_SERVICE_UNASSIGN,
  TagAssignReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";
import { Controller } from "@nestjs/common";
import { TagRelationService } from "./tag-relation.service";

@Controller()
export class TagRelationController {
  constructor(private readonly tagRelationService: TagRelationService) {}

  @MessagePattern(TAG_RELATION_SERVICE_ASSIGN)
  assign(@Payload() dto: TagAssignReqDto): Promise<TagRelationResDto> {
    return this.tagRelationService.assign(dto);
  }

  @MessagePattern(TAG_RELATION_SERVICE_UNASSIGN)
  unassign(
    @Payload() dto: TagUnassignReqDto
  ): Promise<TagRelationResDto | undefined> {
    return this.tagRelationService.unassign(dto);
  }
}
