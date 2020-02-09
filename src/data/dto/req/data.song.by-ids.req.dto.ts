import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DataSongByIdsReqDto {
  constructor(ids: string[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The songs identification",
    example: ["abcdef"],
    isArray: true,
    type: "string"
  })
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
