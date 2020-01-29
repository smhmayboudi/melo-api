import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DataSongSimilarReqDto {
  constructor(from: number, limit: number, songId: number) {
    this.from = from;
    this.limit = limit;
    this.id = songId;
  }

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

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  id: number;
}
