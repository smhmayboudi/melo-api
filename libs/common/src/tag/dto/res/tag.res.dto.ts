import { IsNumberString, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class TagResDto {
  constructor(id: number, name: string, typeId: number, value?: string) {
    this.id = id;
    this.name = name;
    this.typeId = typeId;
    this.value = value;
  }

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The name",
    example: "summer",
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly typeId: number;

  @ApiProperty({
    description: "The extra value",
    example: "abcdef",
  })
  @IsString()
  readonly value?: string;
}
