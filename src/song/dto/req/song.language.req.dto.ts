import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { SongOrderByType } from "../../type/song.order-by.type";

export class SongLanguageReqDto {
  constructor(
    from: number,
    language: string,
    limit: number,
    orderBy: SongOrderByType
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
    example: SongOrderByType.release
  })
  @IsEnum(SongOrderByType)
  orderBy: SongOrderByType;
}
