import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class AlbumArtistAlbumsReqDto {
  constructor(from: number, artistId: string, limit: number) {
    this.from = from;
    this.artistId = artistId;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The artist identification",
    example: "abcdef"
  })
  @IsString()
  artistId: string;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;
}