import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { RelationType } from "../type/relation.type";

export class RelationGetDto {
  constructor(
    from: number,
    fromEntityId: string,
    limit: number,
    relType: RelationType
  ) {
    this.from = from;
    this.fromEntityId = fromEntityId;
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
  @IsString()
  fromEntityId: string;

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
