import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumberString, ValidateNested } from "class-validator";
import { RelationType } from "../../relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

export class RelationGetReqDto {
  constructor(
    from: number,
    fromEntityDto: RelationEntityResDto,
    limit: number,
    relationType: RelationType
  ) {
    this.from = from;
    this.fromEntityDto = fromEntityDto;
    this.limit = limit;
    this.relationType = relationType;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The entity"
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  fromEntityDto: RelationEntityResDto;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relationType: RelationType;
}
