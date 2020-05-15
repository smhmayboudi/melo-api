import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class DataSongAlbumReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The album identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;
}
