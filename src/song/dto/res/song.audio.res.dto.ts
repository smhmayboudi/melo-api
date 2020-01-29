import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { SongMp3ResDto } from "./song.mp3.res.dto";

export class SongAudioResDto {
  constructor(high?: SongMp3ResDto, medium?: SongMp3ResDto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3"
  })
  @IsOptional()
  high?: SongMp3ResDto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  medium?: SongMp3ResDto;
}
