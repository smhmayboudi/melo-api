import { RelationType } from "../type/RelationType";
import { IsDate, IsEnum, IsString } from "class-validator";

export class RelationDtoSet {
  constructor(
    createdAt: Date,
    entityId1: string,
    entityId2: string,
    relType: RelationType
  ) {
    this.createdAt = createdAt;
    this.entityId1 = entityId1;
    this.entityId2 = entityId2;
    this.relType = relType;
  }

  @IsDate()
  createdAt: Date;

  @IsString()
  entityId1: string;

  @IsString()
  entityId2: string;

  @IsEnum(RelationType)
  relType: RelationType;
}
