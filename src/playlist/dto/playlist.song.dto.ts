import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PlaylistSongDto {
  constructor(playlistId: string, songId: string) {
    this.playlistId = playlistId;
    this.songId = songId;
  }

  @ApiProperty({
    description: "The playlist identification",
    example: "abcdef"
  })
  @IsString()
  playlistId: string;

  @ApiProperty({
    description: "The song identification",
    example: "abcdef"
  })
  @IsString()
  songId: string;
}
