import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../../relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

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
    description: "The entity"
  })
  @Exclude({ toPlainOnly: true })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  from: RelationEntityResDto;

  @ApiProperty({
    description: "The entity"
  })
  @Exclude({ toPlainOnly: true })
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
