import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { RelationEntityType } from "../../relation.entity.type";

export class RelationEntityResDto {
  constructor(id: number, type: RelationEntityType, name?: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The name",
    example: "test",
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: "The type",
    example: RelationEntityType.album,
  })
  @IsEnum(RelationEntityType)
  readonly type: RelationEntityType;
}
