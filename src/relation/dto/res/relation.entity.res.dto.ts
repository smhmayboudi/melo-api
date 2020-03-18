import { IsEnum, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityType } from "../../relation.entity.type";

export class RelationEntityResDto {
  constructor(id: string, type: RelationEntityType, name?: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcddef"
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The name",
    example: "test"
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "The type",
    example: RelationEntityType.album
  })
  @IsEnum(RelationEntityType)
  type: RelationEntityType;
}
