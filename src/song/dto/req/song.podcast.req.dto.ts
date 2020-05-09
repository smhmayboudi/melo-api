import { IsArray, IsEnum, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataOrderByType } from "../../../data/data.order-by.type";

export class SongPodcastReqDto {
  constructor(
    from: number,
    genres: string[],
    orderBy: DataOrderByType,
    size: number
  ) {
    this.from = from;
    this.genres = genres;
    this.size = size;
    this.orderBy = orderBy;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The genres",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({
    description: "The order",
    example: DataOrderByType.release,
  })
  @IsEnum(DataOrderByType)
  orderBy: DataOrderByType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  size: number;
}
