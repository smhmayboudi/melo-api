import {
  TagCreateReqDto,
  TagDeleteReqDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";

export interface TagServiceInterface {
  create(dto: TagCreateReqDto): Promise<TagResDto>;
  delete(dto: TagDeleteReqDto): Promise<TagResDto | undefined>;
  tags(dto: TagTagsReqDto): Promise<TagResDto[]>;
  update(dto: TagUpdateReqDto): Promise<TagResDto | undefined>;
}
