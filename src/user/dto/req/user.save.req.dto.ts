import { IsNumberString, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UserSaveReqDto {
  constructor(id: number, telegramId?: number) {
    this.id = id;
    this.telegramId = telegramId;
  }

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  id: number;

  @ApiProperty({
    description: "The telegram identification",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  telegramId?: number;
}
