import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

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
  @IsString()
  id: string;
}
