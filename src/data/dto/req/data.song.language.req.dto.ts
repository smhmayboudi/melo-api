import { IsEnum, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataOrderByType } from "../../data.order-by.type";

export class DataSongLanguageReqDto {
  constructor(
    from: number,
    language: string,
    orderBy: DataOrderByType,
    size: number
  ) {
    this.from = from;
    this.language = language;
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
    description: "The language",
    example: "fa",
  })
  @IsString()
  readonly language: string;

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
