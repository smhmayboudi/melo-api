import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DataSongByIdsReqDto {
  constructor(ids: string[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The songs identification",
    example: [0]
  })
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
