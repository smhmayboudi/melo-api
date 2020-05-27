import { IsEnum, IsNumberString, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityReqDto } from "./relation.entity.req.dto";
import { RelationType } from "../../relation.type";
import { Type } from "class-transformer";

export class RelationGetReqDto {
  constructor(
    from: number,
    fromEntityDto: RelationEntityReqDto,
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
  readonly from: number;

  @ApiProperty({
    description: "The entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly fromEntityDto: RelationEntityReqDto;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows,
  })
  @IsEnum(RelationType)
  readonly relationType: RelationType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
