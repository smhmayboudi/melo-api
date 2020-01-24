import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DataAlbumDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The album identification",
    example: 0
  })
  @IsNumber()
  id: number;
}
