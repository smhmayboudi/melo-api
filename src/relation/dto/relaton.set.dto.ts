import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsString } from "class-validator";
import { RelationType } from "../type/relation.type";

export class RelationSetDto {
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

  @ApiProperty({
    description: "The create date",
    example: new Date()
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The first entity",
    example: "from"
  })
  @IsString()
  entityId1: string;

  @ApiProperty({
    description: "The second entity",
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
