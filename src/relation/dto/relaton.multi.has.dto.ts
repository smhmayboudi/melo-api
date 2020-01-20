import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { RelationType } from "../type/relation.type";

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

  @ApiProperty({
    description: "The from entity identification",
    example: "from"
  })
  @IsString()
  fromEntityId: string;

  @ApiProperty({
    description: "The to entities id",
    example: "to"
  })
  @IsString()
  toEntitiesIds: string;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relType: RelationType;
}
