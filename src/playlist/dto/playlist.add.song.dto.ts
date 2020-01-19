import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PlaylistAddSongDto {
  constructor(playlistId: string, songId: string) {
    this.playlistId = playlistId;
    this.songId = songId;
  }

  @ApiProperty({
    description: "The playlist identification",
    example: 0
  })
  @IsString()
  playlistId: string;

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsString()
  songId: string;
}
