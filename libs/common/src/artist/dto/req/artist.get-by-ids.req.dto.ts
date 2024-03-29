import { IsArray, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class ArtistGetByIdsReqDto {
  constructor(ids: number[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The identification",
    example: ["abcdef"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsNumberString({}, { each: true })
  readonly ids: number[];
}
