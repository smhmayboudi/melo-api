import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class SongPodcastGenresQueryReqDto {
  constructor(genres: string[]) {
    this.genres = genres;
  }

  @ApiProperty({
    description: "The genres",
    example: ["pop"],
    isArray: true,
    type: String
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
