import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class DownloadSongQueryReqDto {
  constructor(filter?: string) {
    this.filter = filter;
  }

  @ApiProperty({
    description: "The filter",
    example: "another break in the wall",
    type: String
  })
  @IsString()
  @IsOptional()
  filter?: string;
}
