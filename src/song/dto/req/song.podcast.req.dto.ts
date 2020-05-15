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
  readonly from: number;

  @ApiProperty({
    description: "The genres",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  readonly genres: string[];

  @ApiProperty({
    description: "The order",
    example: DataOrderByType.release,
  })
  @IsEnum(DataOrderByType)
  readonly orderBy: DataOrderByType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
