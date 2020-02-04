import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumberString, IsString } from "class-validator";
import { DataOrderByType } from "../../../data/type/data.order-by.type";

export class SongPodcastReqDto {
  constructor(
    from: number,
    genres: string[],
    limit: number,
    orderBy: DataOrderByType
  ) {
    this.from = from;
    this.genres = genres;
    this.limit = limit;
    this.orderBy = orderBy;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "The genres",
    example: ["pop"]
  })
  @IsArray()
  @IsString()
  genres: string[];

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: "The order",
    example: DataOrderByType.release
  })
  @IsEnum(DataOrderByType)
  orderBy: DataOrderByType;
}
