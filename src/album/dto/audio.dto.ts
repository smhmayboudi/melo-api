import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { Mp3Dto } from "./mp3.dto";

export class AudioDto {
  constructor(high?: Mp3Dto, medium?: Mp3Dto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3"
  })
  @IsOptional()
  @Type(() => Mp3Dto)
  high?: Mp3Dto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  @Type(() => Mp3Dto)
  medium?: Mp3Dto;
}
