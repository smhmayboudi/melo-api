import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PlaylistAddSongReqDto {
  constructor(playlistId: string, songId: number) {
    this.playlistId = playlistId;
    this.songId = songId;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsString()
  readonly playlistId: string;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly songId: number;
}
