import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class TagTagsReqDto {
  constructor(from: number, size: number) {
    this.from = from;
    this.size = size;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
