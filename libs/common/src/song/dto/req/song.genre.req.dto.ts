import { IsArray, IsEnum, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { SongOrderByType } from "../../../song/song.order-by.type";

export class SongGenreReqDto {
  constructor(
    from: number,
    genres: string[],
    orderBy: SongOrderByType,
    size: number
  ) {
    this.from = from;
    this.genres = genres;
    this.orderBy = orderBy;
    this.size = size;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The genres",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({
    each: true,
  })
  readonly genres: string[];

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
