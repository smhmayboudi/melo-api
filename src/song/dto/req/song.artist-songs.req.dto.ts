import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class SongArtistSongsReqDto {
  constructor(artistId: number, from: number, size: number) {
    this.artistId = artistId;
    this.from = from;
    this.size = size;
  }

  @ApiProperty({
    description: "The artist identification",
    example: "0",
  })
  @IsNumberString()
  artistId: number;

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  size: number;
}
