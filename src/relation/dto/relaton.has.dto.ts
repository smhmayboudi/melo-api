import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../type/relation.type";
import { EntityDto } from "./entity.dto";

export class RelationHasDto {
  constructor(
    entityDto1: EntityDto,
    entityDto2: EntityDto,
    relType: RelationType
  ) {
    this.entityDto1 = entityDto1;
    this.entityDto2 = entityDto2;
    this.relType = relType;
  }

  @ApiProperty({
    description: "The frist entity",
    example: "from"
  })
  @ValidateNested()
  entityDto1: EntityDto;

  @ApiProperty({
    description: "The secnod entity",
    example: "to"
  })
  @ValidateNested()
  entityDto2: EntityDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relType: RelationType;
}
