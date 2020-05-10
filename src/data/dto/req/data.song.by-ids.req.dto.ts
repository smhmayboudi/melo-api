import { IsArray, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataSongByIdsReqDto {
  constructor(ids: number[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The songs identification",
    example: ["abcdef"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsNumberString({}, { each: true })
  ids: number[];
}
