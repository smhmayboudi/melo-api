import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../../type/relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

export class RelationHasReqDto {
  constructor(
    entityDto1: RelationEntityResDto,
    entityDto2: RelationEntityResDto,
    relationType: RelationType
  ) {
    this.from = entityDto1;
    this.to = entityDto2;
    this.relationType = relationType;
  }

  @ApiProperty({
    description: "The entity"
  })
  @Type(() => RelationEntityResDto)
  @ValidateNested()
  from: RelationEntityResDto;

  @ApiProperty({
    description: "The entity"
  })
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
