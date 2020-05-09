import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class SongSimilarReqDto {
  constructor(from: number, id: number, size: number) {
    this.from = from;
    this.size = size;
    this.id = id;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The song identification",
    example: "0",
  })
  @IsNumberString()
  id: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  size: number;
}
