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
    example: new Date()
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "The entity"
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  from: RelationEntityResDto;

  @ApiProperty({
    description: "The entity"
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  to: RelationEntityResDto;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relationType: RelationType;
}
