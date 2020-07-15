import { IsNumberString, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class TagCreateReqDto {
  constructor(name: string, typeId: number, value?: string) {
    this.name = name;
    this.typeId = typeId;
    this.value = value;
  }

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
