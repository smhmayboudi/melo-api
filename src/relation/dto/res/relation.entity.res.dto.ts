import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString, IsEnum } from "class-validator";
import { Exclude } from "class-transformer";
import { RelationEntityType } from "../../type/relation.entity.type";

export class RelationEntityResDto {
  constructor(id: number, type: RelationEntityType, name?: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  @Exclude()
  get key(): string {
    return `${this.type}_${this.id}`;
  }

  @ApiProperty({
    description: "The identification",
    example: 0
  })
  @IsNumber()
  id: number;

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
