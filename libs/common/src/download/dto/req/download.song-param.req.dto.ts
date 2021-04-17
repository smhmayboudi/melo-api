import { IsEnum, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DownloadOrderByType } from "../../download.order-by.type";

export class DownloadSongParamReqDto {
  constructor(from: number, orderBy: DownloadOrderByType, size: number) {
    this.from = from;
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
}
