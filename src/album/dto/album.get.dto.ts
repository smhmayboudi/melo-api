import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AlbumGetDto {
  constructor(albumId: string) {
    this.albumId = albumId;
  }

  @ApiProperty({
    description: "The album identification",
    example: "abcdef"
  })
  @IsNumber()
  albumId: string;
}
