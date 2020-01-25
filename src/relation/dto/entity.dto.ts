import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString } from "class-validator";
import { Exclude } from "class-transformer";

export class EntityDto {
  constructor(id: number, type: string, name?: string) {
    this.id = id;
    this.type = type;
    this.name = name;
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
    description: "The type",
    example: "type"
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: "The name",
    example: "test"
  })
  @IsOptional()
  @IsString()
  name?: string;
}
