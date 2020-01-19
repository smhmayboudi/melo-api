import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ArtistSongsTopDto {
  constructor(artistId: string, from: number, limit: number) {
    this.artistId = artistId;
    this.from = from;
    this.limit = limit;
  }

  @ApiProperty({
    description: "The artist identification",
    example: "abcdef"
  })
  @IsString()
  artistId: string;

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;
}
