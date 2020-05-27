import { IsArray, IsString, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class EmotionEmotionsResDto {
  constructor(song: SongResDto, emotions: string[]) {
    this.song = song;
    this.emotions = emotions;
  }

  @ApiProperty({
    description: "The song",
    example: "0",
  })
  @Type(() => SongResDto)
  @ValidateNested()
  readonly song: SongResDto;

  @ApiProperty({
    description: "The emotions",
    example: ["happy"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  readonly emotions: string[];
}
