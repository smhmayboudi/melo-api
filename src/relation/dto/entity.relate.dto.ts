import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum } from "class-validator";
import { RelationType } from "../type/relation.type";
import { EntityDto } from "./entity.dto";

export class EntityRelateDto {
  constructor(from: EntityDto, relation: RelationType, to: EntityDto) {
    this.from = from;
    this.relation = relation;
    this.to = to;
  }

  @ApiProperty({
    description: "The from entity",
    example: 0
  })
  @Type(() => EntityDto)
  from: EntityDto;

  @ApiProperty({
    description: "The relation type",
    example: 0
  })
  @IsEnum(RelationType)
  relation: RelationType;

  @ApiProperty({
    description: "The to entity",
    example: 0
  })
  @Type(() => EntityDto)
  to: EntityDto;
}
