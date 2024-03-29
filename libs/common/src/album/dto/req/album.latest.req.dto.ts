import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class AlbumLatestReqDto {
  constructor(from: number, language: string, size: number) {
    this.from = from;
    this.language = language;
    this.size = size;
  }

  @ApiProperty({
    description: "The language",
    example: "fa",
  })
  @IsString()
  readonly language: string;

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
