import { IsDate, IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

export class RelationSetReqDto {
  constructor(
    createdAt: Date,
    from: RelationEntityReqDto,
    to: RelationEntityReqDto,
    relationType: RelationType
  ) {
    this.createdAt = createdAt;
    this.from = from;
    this.to = to;
    this.relationType = relationType;
  }

  @ApiProperty({
    description: "The creation date",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

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
