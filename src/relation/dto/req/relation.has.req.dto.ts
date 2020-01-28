import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";
import { RelationType } from "../../type/relation.type";

export class RelationHasReqDto {
  constructor(
    entityDto1: RelationEntityResDto,
    entityDto2: RelationEntityResDto,
    relType: RelationType
  ) {
    this.from = entityDto1;
    this.to = entityDto2;
    this.relType = relType;
  }

  @ApiProperty({
    description: "The entity"
  })
  @ValidateNested()
  from: RelationEntityResDto;

  @ApiProperty({
    description: "The entity"
  })
  @ValidateNested()
  to: RelationEntityResDto;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relType: RelationType;
}
