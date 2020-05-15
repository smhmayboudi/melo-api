import { Exclude, Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";
import { RelationType } from "../../relation.type";

export class RelationRemoveReqDto {
  constructor(
    from: RelationEntityResDto,
    to: RelationEntityResDto,
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
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  readonly from: RelationEntityResDto;

  @ApiProperty({
    description: "The entity",
  })
  @Exclude({ toPlainOnly: true })
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
