import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class DataArtistSongsTopReqDto {
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
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;
}
