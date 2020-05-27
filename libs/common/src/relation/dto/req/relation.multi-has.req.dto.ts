import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

export class RelationMultiHasReqDto {
  constructor(
    from: RelationEntityReqDto,
    relationType: RelationType,
    tos: RelationEntityReqDto[]
  ) {
    this.from = from;
    this.relationType = relationType;
    this.tos = tos;
  }

  @ApiProperty({
    description: "The from entity",
    example: "0",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly from: RelationEntityReqDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows,
  })
  @IsEnum(RelationType)
  readonly relationType: RelationType;

  @ApiProperty({
    description: "The to entity",
    isArray: true,
    type: RelationEntityReqDto,
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested({
    each: true,
  })
  readonly tos: RelationEntityReqDto[];
}
