import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../../type/relation.type";
import { RelationEntityResDto } from "./relation.entity.res.dto";

export class RelationMultiHasResDto {
  constructor(
    from: RelationEntityResDto,
    relation: RelationType,
    to: RelationEntityResDto
  ) {
    this.from = from;
    this.relation = relation;
    this.to = to;
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
  relation: RelationType;

  @ApiProperty({
    description: "The to entity",
    example: 0
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  to: RelationEntityResDto;
}
