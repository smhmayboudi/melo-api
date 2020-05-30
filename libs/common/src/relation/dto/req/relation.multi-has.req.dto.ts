import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEdgeType } from "../../relation.edge.type";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";
import { Type } from "class-transformer";

export class RelationMultiHasReqDto {
  constructor(
    from: RelationEntityReqDto,
    tos: RelationEntityReqDto[],
    type: RelationEdgeType
  ) {
    this.from = from;
    this.tos = tos;
    this.type = type;
  }

  @ApiProperty({
    description: "The from entity",
    example: "0",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly from: RelationEntityReqDto;

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

  @ApiProperty({
    description: "The relation type",
    example: RelationEdgeType.follows,
  })
  @IsEnum(RelationEdgeType)
  readonly type: RelationEdgeType;
}
