import { IsArray, IsDate, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataElasticsearchDownloadResDto {
  constructor(date: Date, song_id: number) {
    this.date = date;
    this.song_id = song_id;
  }

  @ApiProperty({
    description: "The date",
    example: new Date(),
  })
  @IsArray()
  @IsDate()
  readonly date: Date;

  @ApiProperty({
    description: "The song identification",
    example: "0",
  })
  @IsNumberString()
  readonly song_id: number;
}
