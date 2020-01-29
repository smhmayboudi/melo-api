import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { DataOrderByType } from "../../type/data.order-by.type";

export class DataSongNewPodcastReqDto {
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
  @IsNumber()
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
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: "The order",
    example: DataOrderByType.release
  })
  @IsEnum(DataOrderByType)
  orderBy: DataOrderByType;
}
