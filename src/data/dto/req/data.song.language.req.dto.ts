import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { DataOrderByType } from "../../type/data.order-by.type";

export class DataSongLanguageReqDto {
  constructor(
    from: number,
    language: string,
    limit: number,
    orderBy: DataOrderByType
  ) {
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
    example: "abcdef"
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
    example: DataOrderByType.release
  })
  @IsEnum(DataOrderByType)
  orderBy: DataOrderByType;
}
