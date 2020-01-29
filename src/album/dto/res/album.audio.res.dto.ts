import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { AlbumMp3ResDto } from "./album.mp3.res.dto";

export class AlbumAudioResDto {
  constructor(high?: AlbumMp3ResDto, medium?: AlbumMp3ResDto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3"
  })
  @IsOptional()
  high?: AlbumMp3ResDto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  medium?: AlbumMp3ResDto;
}
