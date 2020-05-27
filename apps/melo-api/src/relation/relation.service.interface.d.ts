import {
  DataPaginationResDto,
  RelationEntityReqDto,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationMultiHasResDto,
  RelationRemoveReqDto,
  RelationSetReqDto,
} from "@melo/common";

export interface RelationServiceInterface {
  get(
    dto: RelationGetReqDto
  ): Promise<DataPaginationResDto<RelationEntityReqDto>>;
  has(dto: RelationHasReqDto): Promise<boolean>;
  multiHas(dto: RelationMultiHasReqDto): Promise<RelationMultiHasResDto[]>;
  remove(dto: RelationRemoveReqDto): Promise<boolean>;
  set(dto: RelationSetReqDto): Promise<boolean>;
}
