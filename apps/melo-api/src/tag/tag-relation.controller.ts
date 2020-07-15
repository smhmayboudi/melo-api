import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import {
  TagAssignReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";
import { AuthGuard } from "@nestjs/passport";
import { TagRelationHashIdInterceptor } from "./tag-relation.hash-id.interceptor";
import { TagRelationService } from "./tag-relation.service";

@UseInterceptors(TagRelationHashIdInterceptor)
@ApiBearerAuth("jwt")
@ApiTags("tagRelation")
@Controller("tagRelation")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class TagRelationController {
  constructor(private readonly tagRelationService: TagRelationService) {}
  // TODO: different way to authenticate admins
  @ApiParam({
    name: "categoryId",
    type: String,
  })
  @ApiParam({
    name: "tagId",
    type: String,
  })
  @Post("assign")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async assign(@Body() dto: TagAssignReqDto): Promise<TagRelationResDto> {
    return this.tagRelationService.assign(dto);
  }
  // TODO: different way to authenticate admins
  @ApiParam({
    name: "id",
    type: String,
  })
  @Post("unassign")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async unassign(
    @Body() dto: TagUnassignReqDto
  ): Promise<TagRelationResDto | undefined> {
    return this.tagRelationService.unassign(dto);
  }
}
