import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

export class RelationMultiHasResDto {
  constructor(
    from: RelationEntityReqDto,
    relation: RelationType,
    to: RelationEntityReqDto
  ) {
    this.from = from;
    this.relation = relation;
    this.to = to;
  }

  @ApiProperty({
    description: "The from entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly from: RelationEntityReqDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows,
  })
  @IsEnum(RelationType)
  readonly relation: RelationType;

  @ApiProperty({
    description: "The to entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly to: RelationEntityReqDto;
}
