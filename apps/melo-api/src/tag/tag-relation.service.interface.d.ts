import {
  TagAssignReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";

export interface TagRelationServiceInterface {
  assign(dto: TagAssignReqDto): Promise<TagRelationResDto>;
  unassign(dto: TagUnassignReqDto): Promise<TagRelationResDto | undefined>;
}
