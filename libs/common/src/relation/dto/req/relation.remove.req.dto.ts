import { Exclude, Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityReqDto } from "../req/relation.entity.req.dto";
import { RelationType } from "../../relation.type";

export class RelationRemoveReqDto {
  constructor(
    from: RelationEntityReqDto,
    to: RelationEntityReqDto,
    relationType: RelationType
  ) {
    this.from = from;
    this.to = to;
    this.relationType = relationType;
  }

  @ApiProperty({
    description: "The entity",
  })
  @Exclude({ toPlainOnly: true })
  @Type(() => RelationEntityReqDto)
  @ValidateNested()
  readonly from: RelationEntityReqDto;

  @ApiProperty({
    description: "The entity",
  })
  @Exclude({ toPlainOnly: true })
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
