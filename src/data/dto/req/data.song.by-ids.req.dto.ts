import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class DataSongByIdsReqDto {
  constructor(ids: number[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The songs identification",
    example: [0]
  })
  @IsArray()
  @IsNumber()
  ids: number[];
}
