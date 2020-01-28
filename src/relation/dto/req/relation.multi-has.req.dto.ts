import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../../type/relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

export class RelationMultiHasReqDto {
  constructor(
    from: RelationEntityResDto,
    relType: RelationType,
    tos: RelationEntityResDto[]
  ) {
    this.from = from;
    this.relationType = relType;
    this.tos = tos;
  }

  @Exclude()
  get keys(): string {
    return this.tos.map(value => value.key).join(",");
  }

  @ApiProperty({
    description: "The from entity",
    example: 0
  })
  @ValidateNested()
  from: RelationEntityResDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relationType: RelationType;

  @ApiProperty({
    description: "The to entity",
    example: 0
  })
  @ValidateNested({
    each: true
  })
  tos: RelationEntityResDto[];
}
