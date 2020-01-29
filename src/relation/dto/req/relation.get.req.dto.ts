import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, ValidateNested } from "class-validator";
import { RelationType } from "../../type/relation.type";
import { RelationEntityResDto } from "../res/relation.entity.res.dto";

export class RelationGetReqDto {
  constructor(
    from: number,
    fromEntityDto: RelationEntityResDto,
    limit: number,
    relType: RelationType
  ) {
    this.from = from;
    this.fromEntityDto = fromEntityDto;
    this.limit = limit;
    this.relationType = relType;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "The entity"
  })
  @ValidateNested()
  fromEntityDto: RelationEntityResDto;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: "The type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relationType: RelationType;
}
