import { Exclude, Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEdgeType } from "../../relation.edge.type";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";

export class RelationRemoveReqDto {
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
    description: "The entity",
  })
  @Exclude({
    toPlainOnly: true,
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly from: RelationEntityReqDto;

  @ApiProperty({
    description: "The entity",
  })
  @Exclude({
    toPlainOnly: true,
  })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly to: RelationEntityReqDto;

  @ApiProperty({
    description: "The type",
    example: RelationEdgeType.follows,
  })
  @IsEnum(RelationEdgeType)
  readonly type: RelationEdgeType;
}
