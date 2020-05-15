import { IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";

import { ActionType } from "../action.type";
import { ApiProperty } from "@nestjs/swagger";
import { LikeSongDto } from "./like.song.dto";
import { NextSongDto } from "./next.song.dto";
import { PauseSongDto } from "./pause.song.dto";
import { PlaySongDto } from "./play.song.dto";
import { PreviousSongDto } from "./previous.song.dto";
import { SeekSongDto } from "./seek.song.dto";

export class ActionDto {
  constructor(
    datetime: string,
    type: ActionType,
    likeSong?: LikeSongDto,
    nextSong?: NextSongDto,
    pauseSong?: PauseSongDto,
    playSong?: PlaySongDto,
    previousSong?: PreviousSongDto,
    seekSong?: SeekSongDto
  ) {
    this.datetime = datetime;
    this.type = type;
    this.likeSong = likeSong;
    this.nextSong = nextSong;
    this.pauseSong = pauseSong;
    this.playSong = playSong;
    this.previousSong = previousSong;
    this.seekSong = seekSong;
  }

  @ApiProperty({
    description: "The datetime",
    example: "",
  })
  @IsString()
  readonly datetime: string;

  @ApiProperty({
    description: "The identification",
    example: ActionType.likeSong,
  })
  @IsEnum(ActionType)
  readonly type: ActionType;

  @ApiProperty({
    description: "The like song",
  })
  @IsOptional()
  @ValidateNested()
  readonly likeSong?: LikeSongDto;

  @ApiProperty({
    description: "The next song",
  })
  @IsOptional()
  @ValidateNested()
  readonly nextSong?: NextSongDto;

  @ApiProperty({
    description: "The next song",
  })
  @IsOptional()
  @ValidateNested()
  readonly pauseSong?: PauseSongDto;

  @ApiProperty({
    description: "The play song",
  })
  @IsOptional()
  @ValidateNested()
  readonly playSong?: PlaySongDto;

  @ApiProperty({
    description: "The previous song",
  })
  @IsOptional()
  @ValidateNested()
  readonly previousSong?: PreviousSongDto;

  @ApiProperty({
    description: "The previous song",
  })
  @IsOptional()
  @ValidateNested()
  readonly seekSong?: SeekSongDto;
}
