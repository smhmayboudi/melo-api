import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class DataSongArtistsReqDto {
  constructor(from: number, id: string, limit: number) {
    this.from = from;
    this.id = id;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The artist identification",
    example: 0
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;
}
