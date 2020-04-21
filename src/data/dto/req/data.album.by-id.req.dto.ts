import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class DataAlbumByIdReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The album identification",
    example: "abcdef",
  })
  @IsNumberString()
  id: number;
}
