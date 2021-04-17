import {
  TagCreateReqDto,
  TagDeleteReqDto,
  TagFindOneReqDto,
  TagResDto,
  TagTagsReqDto,
  TagUpdateReqDto,
} from "@melo/common";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagServiceInterface {
  create(dto: TagCreateReqDto): Promise<TagResDto>;
  delete(dto: TagDeleteReqDto): Promise<TagResDto | undefined>;
  findOne(dto: TagFindOneReqDto): Promise<TagResDto | undefined>;
  tags(dto: TagTagsReqDto): Promise<TagResDto[]>;
  update(dto: TagUpdateReqDto): Promise<TagResDto | undefined>;
}
