import { IsEnum, IsNumberString, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEdgeType } from "../../relation.edge.type";
import { RelationEntityReqDto } from "./relation.entity.req.dto";
import { Type } from "class-transformer";

export class RelationGetReqDto {
  constructor(
    entity: RelationEntityReqDto,
    from: number,
    size: number,
    type: RelationEdgeType
  ) {
    this.entity = entity;
    this.from = from;
    this.size = size;
    this.type = type;
  }

  @ApiProperty({
    description: "The entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly entity: RelationEntityReqDto;

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;

  @ApiProperty({
    description: "The type",
    example: RelationEdgeType.follows,
  })
  @IsEnum(RelationEdgeType)
  readonly type: RelationEdgeType;
}
