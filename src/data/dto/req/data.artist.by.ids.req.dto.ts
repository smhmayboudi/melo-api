import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DataArtistByIdsReqDto {
  constructor(ids: string[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The artists identification",
    example: 0
  })
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
