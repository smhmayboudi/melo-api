import { RelationType } from "../type/RelationType";
import { IsEnum, IsString } from "class-validator";

export class RelationMultiHasDto {
  constructor(
    fromEntityId: string,
    toEntitiesIds: string,
    relType: RelationType
  ) {
    this.fromEntityId = fromEntityId;
    this.toEntitiesIds = toEntitiesIds;
    this.relType = relType;
  }

  @IsString()
  fromEntityId: string;

  @IsString()
  toEntitiesIds: string;

  @IsEnum(RelationType)
  relType: RelationType;
}
