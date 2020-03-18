import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataAlbumLatestReqDto {
  constructor(from: number, language: string, limit: number) {
    this.from = from;
    this.language = language;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The language",
    example: "fa"
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;
}
