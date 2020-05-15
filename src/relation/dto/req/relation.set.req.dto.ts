import { IsDate, IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

export class RelationSetReqDto {
  constructor(
    createdAt: Date,
    from: RelationEntityResDto,
    to: RelationEntityResDto,
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
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  readonly from: RelationEntityResDto;

  @ApiProperty({
    description: "The entity",
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  readonly to: RelationEntityResDto;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows,
  })
  @IsEnum(RelationType)
  readonly relationType: RelationType;
}
