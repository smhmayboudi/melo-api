import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ArtistSongsTopDto {
  constructor(id: number, from: number, limit: number) {
    this.id = id;
    this.from = from;
    this.limit = limit;
  }

  @ApiProperty({
    description: "The artist identification",
    example: 0
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;
}
