import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataImageTypeSize {
  constructor(height: number, name: string, width: number) {
    this.height = height;
    this.name = name;
    this.width = width;
  }

  @ApiProperty({
    description: "The height",
    example: "0",
  })
  @IsNumberString()
  height: number;

  @ApiProperty({
    description: "The name",
    example: "smith",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The width",
    example: "0",
  })
  @IsNumberString()
  width: number;
}
