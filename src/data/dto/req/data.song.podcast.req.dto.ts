import { IsArray, IsEnum, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataOrderByType } from "../../data.order-by.type";

export class DataSongPodcastReqDto {
  constructor(
    from: number,
    genres: string[],
    orderBy: DataOrderByType,
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
