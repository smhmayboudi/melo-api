import { IsArray, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SongSongGenresQueryReqDto {
  constructor(genres: string[]) {
    this.genres = genres;
  }

  @ApiProperty({
    description: "The genres",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  readonly genres: string[];
}
