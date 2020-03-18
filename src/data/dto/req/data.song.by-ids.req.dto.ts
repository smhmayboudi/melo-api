import { IsArray, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataSongByIdsReqDto {
  constructor(ids: string[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The songs identification",
    example: ["abcdef"],
    isArray: true,
    type: String
  })
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
