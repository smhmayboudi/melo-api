import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class UserFindOneByTelegramIdReqDto {
  constructor(telegramId: number) {
    this.telegramId = telegramId;
  }

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  telegramId: number;
}
