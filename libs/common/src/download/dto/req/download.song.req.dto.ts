import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

import { DownloadOrderByType } from "../../download.order-by.type";

export class DownloadSongReqDto {
  constructor(
    from: number,
    orderBy: DownloadOrderByType,
    size: number,
    sub: number,
    filter?: string
  ) {
    this.from = from;
    this.orderBy = orderBy;
    this.size = size;
    this.sub = sub;
    this.filter = filter;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The order",
    example: DownloadOrderByType.asc,
  })
  @IsEnum(DownloadOrderByType)
  readonly orderBy: DownloadOrderByType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  @ApiProperty({
    description: "The filter",
    example: "another break in the wall",
    type: String,
  })
  @IsString()
  @IsOptional()
  readonly filter?: string;
}
