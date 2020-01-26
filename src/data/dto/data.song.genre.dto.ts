import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { OrderBy } from "../type/order-by.type";

export class DataSongGenreDto {
  constructor(
    from: number,
    genres: string[],
    ids: number[],
    limit: number,
    orderBy: OrderBy
  ) {
    this.from = from;
    this.genres = genres;
    this.ids = ids;
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
    description: "The song identification",
    example: [0]
  })
  @IsArray()
  @IsNumber()
  ids: number[];

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: "The order",
    example: OrderBy.release
  })
  @IsEnum(OrderBy)
  orderBy: OrderBy;
}
