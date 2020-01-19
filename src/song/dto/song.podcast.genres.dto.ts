import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class SongPodcastGenresDto {
  constructor(from: number, genres: string[], limit: number, orderBy: string) {
    this.from = from;
    this.genres = genres;
    this.limit = limit;
    this.orderBy = orderBy;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "The list of genres",
    example: ["pop"]
  })
  @IsArray()
  genres: string[];

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: "The order",
    example: "ASC"
  })
  @IsString()
  orderBy: string;
}
