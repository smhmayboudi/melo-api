import { IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataAlbumArtistsReqDto {
  constructor(from: number, id: number, limit: number) {
    this.from = from;
    this.id = id;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The artist identification",
    example: "abcdef",
  })
  @IsNumberString()
  id: number;

  @ApiProperty({
    description: "Count of results",
    example: "0",
  })
  @IsNumberString()
  limit: number;
}
