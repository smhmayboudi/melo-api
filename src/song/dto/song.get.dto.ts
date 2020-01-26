import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SongGetDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: 0
  })
  @IsNumber()
  id: number;
}
