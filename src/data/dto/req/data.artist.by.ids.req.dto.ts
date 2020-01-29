import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class DataArtistByIdsReqDto {
  constructor(ids: number[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The artists identification",
    example: 0
  })
  @IsArray()
  @IsNumber()
  ids: number[];
}
