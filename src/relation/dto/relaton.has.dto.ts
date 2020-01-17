import { RelationType } from "../type/RelationType";
import { IsEnum, IsString } from "class-validator";

export class RelationHasDto {
  constructor(entityId1: string, entityId2: string, relType: RelationType) {
    this.entityId1 = entityId1;
    this.entityId2 = entityId2;
    this.relType = relType;
  }

  @IsString()
  entityId1: string;

  @IsString()
  entityId2: string;

  @IsEnum(RelationType)
  relType: RelationType;
}
