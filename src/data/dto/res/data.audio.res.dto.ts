import { ApiProperty } from "@nestjs/swagger";
import { DataMp3ResDto } from "./data.mp3.res.dto";
import { IsOptional } from "class-validator";

export class DataAudioResDto {
  constructor(high?: DataMp3ResDto, medium?: DataMp3ResDto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3",
  })
  @IsOptional()
  readonly high?: DataMp3ResDto;

  @ApiProperty({
    description: "The medium quality of mp3",
  })
  @IsOptional()
  readonly medium?: DataMp3ResDto;
}
