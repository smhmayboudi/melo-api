import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DataArtistByIdsReqDto {
  constructor(ids: string[]) {
    this.ids = ids;
  }

  @ApiProperty({
    description: "The artists identification",
    example: ["abcdef"],
    isArray: true,
    type: String
  })
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
