import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DataArtistTrendingGenreDto {
  constructor(genre: string) {
    this.genre = genre;
  }

  @ApiProperty({
    description: "The genre",
    example: 0
  })
  @IsString()
  genre: string;
}
