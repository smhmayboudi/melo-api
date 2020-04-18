import { IsArray, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataArtistByIdsReqDto {
  constructor(ids: number[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The artists identification",
    example: ["abcdef"],
    isArray: true,
    type: Number,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
