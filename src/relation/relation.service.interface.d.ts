import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";

export interface RelationServiceInterface {
  get(
    dto: RelationGetReqDto
  ): Promise<RelationPaginationResDto<RelationEntityResDto>>;
  has(dto: RelationHasReqDto): Promise<boolean>;
  multiHas(dto: RelationMultiHasReqDto): Promise<RelationMultiHasResDto[]>;
  remove(dto: RelationRemoveReqDto): Promise<boolean>;
  set(dto: RelationSetReqDto): Promise<boolean>;
}
