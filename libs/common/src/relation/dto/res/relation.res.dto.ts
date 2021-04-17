import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEdgeType } from "../../relation.edge.type";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";
import { Type } from "class-transformer";

export class RelationResDto {
  constructor(
    from: RelationEntityReqDto,
    to: RelationEntityReqDto,
    type: RelationEdgeType
  ) {
    this.from = from;
    this.to = to;
    this.type = type;
  }

  @ApiProperty({
    description: "The from entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly from: RelationEntityReqDto;

  @ApiProperty({
    description: "The to entity",
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly to: RelationEntityReqDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationEdgeType.follows,
  })
  @IsEnum(RelationEdgeType)
  readonly type: RelationEdgeType;
}
