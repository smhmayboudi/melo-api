import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

export class RelationHasReqDto {
  constructor(
    entityDto1: RelationEntityReqDto,
    entityDto2: RelationEntityReqDto,
    relationType: RelationType
  ) {
    this.from = entityDto1;
    this.to = entityDto2;
    this.relationType = relationType;
  }

  @ApiProperty({
    description: "The entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly from: RelationEntityReqDto;

  @ApiProperty({
    description: "The entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly to: RelationEntityReqDto;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows,
  })
  @IsEnum(RelationType)
  readonly relationType: RelationType;
}
