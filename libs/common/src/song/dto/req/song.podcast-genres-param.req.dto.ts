import { IsEnum, IsNumberString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { SongOrderByType } from "../../song.order-by.type";

export class SongPodcastGenresParamReqDto {
  constructor(from: number, orderBy: SongOrderByType, size: number) {
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
    example: SongOrderByType.release,
  })
  @IsEnum(SongOrderByType)
  readonly orderBy: SongOrderByType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
