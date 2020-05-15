import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class AlbumArtistAlbumsReqDto {
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
  readonly artistId: number;

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
