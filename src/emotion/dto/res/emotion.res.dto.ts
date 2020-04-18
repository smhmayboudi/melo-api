import { IsArray, IsString, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataSongResDto } from "../../../data/dto/res/data.song.res.dto";

export class EmotionResDto {
  constructor(song: DataSongResDto, emotions: string[]) {
    this.song = song;
    this.emotions = emotions;
  }

  @ApiProperty({
    description: "the song",
    example: 0,
  })
  @ValidateNested()
  song: DataSongResDto;

  @ApiProperty({
    description: "The emotions",
    example: ["happy"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  emotions: string[];
}
