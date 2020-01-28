import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { DataMp3ResDto } from "./data.mp3.res.dto";

export class DataAudioResDto {
  constructor(high?: DataMp3ResDto, medium?: DataMp3ResDto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3"
  })
  @IsOptional()
  high?: DataMp3ResDto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  medium?: DataMp3ResDto;
}
