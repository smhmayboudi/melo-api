import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityResDto } from "./relation.entity.res.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

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
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  readonly from: RelationEntityResDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows,
  })
  @IsEnum(RelationType)
  readonly relation: RelationType;

  @ApiProperty({
    description: "The to entity",
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  readonly to: RelationEntityResDto;
}
