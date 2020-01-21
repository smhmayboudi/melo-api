import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { ActionType } from "../type/action.type";
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
    example: ""
  })
  @IsString()
  datetime: string;

  @ApiProperty({
    description: "The identification",
    example: ActionType.likeSong
  })
  @IsEnum(ActionType)
  type: ActionType;

  @ApiProperty({
    description: "The like song"
  })
  @IsOptional()
  @ValidateNested()
  likeSong?: LikeSongDto;

  @ApiProperty({
    description: "The next song"
  })
  @IsOptional()
  @ValidateNested()
  nextSong?: NextSongDto;

  @ApiProperty({
    description: "The next song"
  })
  @IsOptional()
  @ValidateNested()
  pauseSong?: PauseSongDto;

  @ApiProperty({
    description: "The play song"
  })
  @IsOptional()
  @ValidateNested()
  playSong?: PlaySongDto;

  @ApiProperty({
    description: "The previous song"
  })
  @IsOptional()
  @ValidateNested()
  previousSong?: PreviousSongDto;

  @ApiProperty({
    description: "The previous song"
  })
  @IsOptional()
  @ValidateNested()
  seekSong?: SeekSongDto;
}
