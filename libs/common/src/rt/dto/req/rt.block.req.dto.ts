import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RtBlockReqDto {
  constructor(id: number, description: string) {
    this.description = description;
    this.id = id;
  }

  @ApiProperty({
    description: "description of blocked",
    example: "This token is bridged.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  id: number;
}
