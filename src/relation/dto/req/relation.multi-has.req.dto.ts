import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../../type/relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

export class RelationMultiHasReqDto {
  constructor(
    from: RelationEntityResDto,
    relationType: RelationType,
    tos: RelationEntityResDto[]
  ) {
    this.from = from;
    this.relationType = relationType;
    this.tos = tos;
  }

  @ApiProperty({
    description: "The from entity",
    example: 0
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  from: RelationEntityResDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relationType: RelationType;

  @ApiProperty({
    description: "The to entity",
    example: 0
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested({
    each: true
  })
  tos: RelationEntityResDto[];
}