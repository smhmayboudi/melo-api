import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class DataArtistByIdsDto {
  constructor(artistsIds: number[]) {
    this.artistsIds = artistsIds;
  }

  @ApiProperty({
    description: "The artists identification",
    example: 0
  })
  @IsArray()
  @IsNumber()
  artistsIds: number[];
}
