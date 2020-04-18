import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PlaylistAddSongReqDto {
  constructor(playlistId: string, songId: number) {
    this.playlistId = playlistId;
    this.songId = songId;
  }

  @ApiProperty({
    description: "The playlist identification",
    example: "abcdef",
  })
  @IsString()
  playlistId: string;

  @ApiProperty({
    description: "The song identification",
    example: 0,
  })
  @IsNumberString()
  songId: number;
}
