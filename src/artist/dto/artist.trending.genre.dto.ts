import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ArtistTrendingGenreDto {
  constructor(from: number, genre: string, limit: number) {
    this.from = from;
    this.genre = genre;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "The genre",
    example: "pop"
  })
  @IsString()
  genre: string;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;
}
