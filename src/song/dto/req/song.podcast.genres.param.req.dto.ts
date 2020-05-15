import { IsEnum, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataOrderByType } from "../../../data/data.order-by.type";

export class SongPodcastGenresParamReqDto {
  constructor(from: number, orderBy: DataOrderByType, size: number) {
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
