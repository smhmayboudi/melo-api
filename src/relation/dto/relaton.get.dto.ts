import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { RelationType } from "../type/relation.type";
import { EntityDto } from "./entity.dto";

export class RelationGetDto {
  constructor(
    from: number,
    fromEntityDto: EntityDto,
    limit: number,
    relType: RelationType
  ) {
    this.from = from;
    this.fromEntityDto = fromEntityDto;
    this.limit = limit;
    this.relType = relType;
  }

  @ApiProperty({
    description: "The from",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "The from entity identification",
    example: "from"
  })
  fromEntityDto: EntityDto;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relType: RelationType;
}
