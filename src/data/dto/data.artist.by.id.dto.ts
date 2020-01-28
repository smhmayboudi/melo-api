import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DataArtistByIdDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The artist identification",
    example: 0
  })
  @IsNumber()
  id: number;
}
