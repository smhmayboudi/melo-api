import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

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
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  id: number;
}
