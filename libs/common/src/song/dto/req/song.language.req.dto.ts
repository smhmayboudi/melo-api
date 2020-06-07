import { IsEnum, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { SongOrderByType } from "../../../song/song.order-by.type";

export class SongLanguageReqDto {
  constructor(
    from: number,
    language: string,
    orderBy: SongOrderByType,
    size: number
  ) {
    this.from = from;
    this.language = language;
    this.orderBy = orderBy;
    this.size = size;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @ApiProperty({
    description: "The language",
    example: "abcdef",
  })
  @IsString()
  readonly language: string;

  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The order",
    example: SongOrderByType.release,
  })
  @IsEnum(SongOrderByType)
  readonly orderBy: SongOrderByType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
