import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DataAlbumByIdReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The album identification",
    example: "abcdef",
  })
  @IsNumber()
  id: number;
}
