import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SongSendTelegramDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  id: number;
}