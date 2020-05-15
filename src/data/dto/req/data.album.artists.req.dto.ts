import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class DataAlbumArtistsReqDto {
  constructor(from: number, id: number, size: number) {
    this.from = from;
    this.id = id;
    this.size = size;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The artist identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
