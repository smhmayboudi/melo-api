import { IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DownloadSongQueryReqDto {
  constructor(filter?: string) {
    this.filter = filter;
  }

  @ApiProperty({
    description: "The filter",
    example: "another break in the wall",
    type: String,
  })
  @IsString()
  @IsOptional()
  readonly filter?: string;
}
