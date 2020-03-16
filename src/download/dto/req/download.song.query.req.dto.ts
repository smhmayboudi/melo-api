import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
