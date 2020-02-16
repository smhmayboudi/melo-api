import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumberString, IsString } from "class-validator";
import { DataOrderByType } from "../../../data/data.order-by.type";

export class SongLanguageReqDto {
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
  @IsNumberString()
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
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: "The order",
    example: DataOrderByType.release
  })
  @IsEnum(DataOrderByType)
  orderBy: DataOrderByType;
}
