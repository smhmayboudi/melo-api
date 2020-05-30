import {
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
} from "@melo/common";

export interface RelationServiceInterface {
  get(dto: RelationGetReqDto): Promise<RelationResDto[]>;
  has(dto: RelationHasReqDto): Promise<RelationResDto | undefined>;
  multiHas(dto: RelationMultiHasReqDto): Promise<RelationResDto[]>;
  remove(dto: RelationRemoveReqDto): Promise<RelationResDto>;
  set(dto: RelationSetReqDto): Promise<RelationResDto>;
}
