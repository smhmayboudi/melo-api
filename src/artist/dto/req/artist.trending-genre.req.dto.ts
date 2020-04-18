import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ArtistTrendingGenreReqDto {
  constructor(genre: string) {
    this.genre = genre;
  }

  @ApiProperty({
    description: "The genre",
    example: "pop",
  })
  @IsString()
  genre: string;
}
