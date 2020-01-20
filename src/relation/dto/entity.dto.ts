import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EntityDto {
  constructor(id: string, type: string, name?: string) {
    this.id = id;
    this.type = type;
    this.name = name;
  }

  @ApiProperty({
    description: "The identification",
    example: 0
  })
  @IsString()
  id: string;

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
