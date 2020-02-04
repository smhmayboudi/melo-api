import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumberString } from "class-validator";
import { DataOrderByType } from "../../../data/type/data.order-by.type";

export class SongPodcastGenresParamReqDto {
  constructor(from: number, limit: number, orderBy: DataOrderByType) {
    this.from = from;
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
