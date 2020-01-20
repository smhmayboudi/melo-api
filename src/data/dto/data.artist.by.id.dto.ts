import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DataArtistByIdDto {
  constructor(artistId: number) {
    this.artistId = artistId;
  }

  @ApiProperty({
    description: "The artist identification",
    example: 0
  })
  @IsNumber()
  artistId: number;
}
