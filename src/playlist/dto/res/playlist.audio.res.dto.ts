import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PlaylistMp3ResDto } from "./playlist.mp3.res.dto";

export class PlaylistAudioResDto {
  constructor(high?: PlaylistMp3ResDto, medium?: PlaylistMp3ResDto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3"
  })
  @IsOptional()
  high?: PlaylistMp3ResDto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  medium?: PlaylistMp3ResDto;
}
