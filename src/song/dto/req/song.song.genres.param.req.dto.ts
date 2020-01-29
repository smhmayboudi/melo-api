import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { SongOrderByType } from "../../type/song.order-by.type";

export class SongSongGenresParamReqDto {
  constructor(from: number, limit: number, orderBy: SongOrderByType) {
    this.from = from;
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
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: "The order",
    example: SongOrderByType.release
  })
  @IsEnum(SongOrderByType)
  orderBy: SongOrderByType;
}
