import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class SongSongGenresQueryReqDto {
  constructor(genres: string[]) {
    this.genres = genres;
  }

  @ApiProperty({
    description: "The genres",
    example: ["pop"],
    isArray: true,
    type: "string"
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
