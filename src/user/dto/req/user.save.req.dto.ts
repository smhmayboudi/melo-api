import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UserSaveReqDto {
  constructor(id: number, telegramId?: number) {
    this.id = id;
    this.telegramId = telegramId;
  }

  @ApiProperty({
    description: "The identification",
    example: 0
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "The telegram identification",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  telegramId?: number;
}