import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SongSimilarReqDto {
  constructor(from: number, limit: number, id: string) {
    this.from = from;
    this.limit = limit;
    this.id = id;
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
  @IsString()
  id: string;
}
