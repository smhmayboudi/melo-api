import { MessagePattern, Payload } from "@nestjs/microservices";
import {
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
import { Controller } from "@nestjs/common";
import { TagService } from "./tag.service";

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @MessagePattern(TAG_SERVICE_CREATE)
  create(@Payload() dto: TagCreateReqDto): Promise<TagResDto> {
    return this.tagService.create(dto);
  }

  @MessagePattern(TAG_SERVICE_DELETE)
  delete(@Payload() dto: TagDeleteReqDto): Promise<TagResDto | undefined> {
    return this.tagService.delete(dto);
  }

  @MessagePattern(TAG_SERVICE_TAGS)
  tags(@Payload() dto: TagTagsReqDto): Promise<TagResDto[]> {
    return this.tagService.tags(dto);
  }

  @MessagePattern(TAG_SERVICE_UPDATE)
  update(@Payload() dto: TagUpdateReqDto): Promise<TagResDto | undefined> {
    return this.tagService.update(dto);
  }
}
