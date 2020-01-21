import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
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
  @ValidateNested()
  high?: Mp3Dto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  @ValidateNested()
  medium?: Mp3Dto;
}
