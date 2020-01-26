import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { OrderBy } from "../../data/type/order-by.type";

export class SongLanguageDto {
  constructor(from: number, language: string, limit: number, orderBy: OrderBy) {
    this.from = from;
    this.language = language;
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
    description: "The language",
    example: "fa"
  })
  @IsString()
  language: string;

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
