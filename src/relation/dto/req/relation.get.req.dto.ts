import { IsEnum, IsNumberString, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

export class RelationGetReqDto {
  constructor(
    from: number,
    fromEntityDto: RelationEntityResDto,
    relationType: RelationType,
    size: number
  ) {
    this.from = from;
    this.fromEntityDto = fromEntityDto;
    this.relationType = relationType;
    this.size = size;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The entity",
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  fromEntityDto: RelationEntityResDto;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows,
  })
  @IsEnum(RelationType)
  relationType: RelationType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  size: number;
}
