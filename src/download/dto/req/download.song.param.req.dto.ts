import { IsEnum, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DownloadOrderByType } from "../../download.order-by.type";
import { DownloadSortByType } from "../../download.sort-by.type";

export class DownloadSongParamReqDto {
  constructor(
    from: number,
    limit: number,
    orderBy: DownloadOrderByType,
    sortBy: DownloadSortByType
  ) {
    this.from = from;
    this.limit = limit;
    this.orderBy = orderBy;
    this.sortBy = sortBy;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: "0",
  })
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: "The order",
    example: DownloadOrderByType.asc,
  })
  @IsEnum(DownloadOrderByType)
  orderBy: DownloadOrderByType;

  @ApiProperty({
    description: "The sort",
    example: DownloadSortByType.date,
  })
  @IsEnum(DownloadSortByType)
  sortBy: DownloadSortByType;
}
