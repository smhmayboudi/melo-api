import { IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";

import { ActionSongLikeReqDto } from "./action.song-like.req.dto";
import { ActionSongNextReqDto } from "./action.song-next.req.dto";
import { ActionSongPauseReqDto } from "./action.song-pause.req.dto";
import { ActionSongPlayReqDto } from "./action.song-play.req.dto";
import { ActionSongPreviousReqDto } from "./action.song-previous.req.dto";
import { ActionSongSeekReqDto } from "./action.song-seek.req.dto";
import { ActionType } from "../../action.type";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class ActionBulkReqDto {
  constructor(
    datetime: string,
    type: ActionType,
    likeSong?: ActionSongLikeReqDto,
    nextSong?: ActionSongNextReqDto,
    pauseSong?: ActionSongPauseReqDto,
    playSong?: ActionSongPlayReqDto,
    previousSong?: ActionSongPreviousReqDto,
    seekSong?: ActionSongSeekReqDto
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
  @Type(() => ActionSongLikeReqDto)
  @ValidateNested()
  readonly likeSong?: ActionSongLikeReqDto;

  @ApiProperty({
    description: "The next song",
  })
  @IsOptional()
  @Type(() => ActionSongNextReqDto)
  @ValidateNested()
  readonly nextSong?: ActionSongNextReqDto;

  @ApiProperty({
    description: "The next song",
  })
  @IsOptional()
  @Type(() => ActionSongPauseReqDto)
  @ValidateNested()
  readonly pauseSong?: ActionSongPauseReqDto;

  @ApiProperty({
    description: "The play song",
  })
  @IsOptional()
  @Type(() => ActionSongPlayReqDto)
  @ValidateNested()
  readonly playSong?: ActionSongPlayReqDto;

  @ApiProperty({
    description: "The previous song",
  })
  @IsOptional()
  @Type(() => ActionSongPreviousReqDto)
  @ValidateNested()
  readonly previousSong?: ActionSongPreviousReqDto;

  @ApiProperty({
    description: "The previous song",
  })
  @IsOptional()
  @Type(() => ActionSongSeekReqDto)
  @ValidateNested()
  readonly seekSong?: ActionSongSeekReqDto;
}
