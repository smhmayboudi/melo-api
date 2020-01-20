import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DataAlbumDto {
  constructor(albumId: number) {
    this.albumId = albumId;
  }

  @ApiProperty({
    description: "The album identification",
    example: 0
  })
  @IsNumber()
  albumId: number;
}
