import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { RelationType } from "../type/relation.type";

export class RelationHasDto {
  constructor(entityId1: string, entityId2: string, relType: RelationType) {
    this.entityId1 = entityId1;
    this.entityId2 = entityId2;
    this.relType = relType;
  }

  @ApiProperty({
    description: "The frist entity",
    example: "from"
  })
  @IsString()
  entityId1: string;

  @ApiProperty({
    description: "The secnod entity",
    example: "to"
  })
  @IsString()
  entityId2: string;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relType: RelationType;
}