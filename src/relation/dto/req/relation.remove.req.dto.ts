import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../../type/relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

export class RelationRemoveReqDto {
  constructor(
    from: RelationEntityResDto,
    to: RelationEntityResDto,
    relType: RelationType
  ) {
    this.from = from;
    this.to = to;
    this.relType = relType;
  }

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
  relType: RelationType;
}
