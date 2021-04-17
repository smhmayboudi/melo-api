import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import {
  TagCreateReqDto,
  TagDeleteReqDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";
import { AuthGuard } from "@nestjs/passport";
import { TagHashIdInterceptor } from "./tag.hash-id.interceptor";
import { TagService } from "./tag.service";

@UseInterceptors(TagHashIdInterceptor)
@ApiBearerAuth("jwt")
@ApiTags("tag")
@Controller("tag")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class TagController {
  constructor(private readonly tagService: TagService) {}
  // TODO: different way to authenticate admins
  @ApiParam({
    name: "typeId",
    type: String,
  })
  @Post("create")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async create(@Body() dto: TagCreateReqDto): Promise<TagResDto> {
    return this.tagService.create(dto);
  }
  // TODO: different way to authenticate admins
  @Delete("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async delete(@Param() dto: TagDeleteReqDto): Promise<TagResDto | undefined> {
    return this.tagService.delete(dto);
  }
  // TODO: different way to authenticate admins
  @Get("/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async tags(@Param() dto: TagTagsReqDto): Promise<TagResDto[]> {
    return this.tagService.tags(dto);
  }
  // TODO: different way to authenticate admins
  @ApiParam({
    name: "id",
    type: String,
  })
  @ApiParam({
    name: "typeId",
    type: String,
  })
  @Post("update")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async update(@Body() dto: TagUpdateReqDto): Promise<TagResDto | undefined> {
    return this.tagService.update(dto);
  }
}
