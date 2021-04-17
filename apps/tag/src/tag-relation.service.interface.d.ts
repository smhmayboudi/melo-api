import {
  TagAssignReqDto,
  TagFindOneRelationReqDto,
  TagRelationResDto,
  TagUnassignReqDto,
} from "@melo/common";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagRelationServiceInterface {
  assign(dto: TagAssignReqDto): Promise<TagRelationResDto>;
  findOneRelation(
    dto: TagFindOneRelationReqDto
  ): Promise<TagRelationResDto | undefined>;
  unassign(dto: TagUnassignReqDto): Promise<TagRelationResDto | undefined>;
}
