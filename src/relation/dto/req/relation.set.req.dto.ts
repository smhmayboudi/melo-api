import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsDate, IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../../type/relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

export class RelationSetReqDto {
  constructor(
    createdAt: Date,
    from: RelationEntityResDto,
    to: RelationEntityResDto,
    relationType: RelationType
  ) {
    this.createdAt = createdAt;
    this.from = from;
    this.to = to;
    this.relationType = relationType;
  }

  @ApiProperty({
    description: "The creation date",
    example: new Date()
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The entity"
  })
  @Expose({ name: "entityDto1" })
  @Transform(value => value.key)
  @ValidateNested()
  from: RelationEntityResDto;

  @ApiProperty({
    description: "The entity"
  })
  @Expose({ name: "entityDto2" })
  @Transform(value => value.key)
  @ValidateNested()
  to: RelationEntityResDto;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relationType: RelationType;
}
