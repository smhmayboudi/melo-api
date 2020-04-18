import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class SongArtistSongsTopReqDto {
  constructor(from: number, artistId: number, limit: number) {
    this.from = from;
    this.artistId = artistId;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0,
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The artist identification",
    example: 0,
  })
  @IsNumberString()
  artistId: number;

  @ApiProperty({
    description: "Count of results",
    example: 0,
  })
  @IsNumberString()
  limit: number;
}
