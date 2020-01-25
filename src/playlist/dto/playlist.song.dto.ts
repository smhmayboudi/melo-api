import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class PlaylistSongDto {
  constructor(playlistId: string, songId: number) {
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
    example: 0
  })
  @IsNumber()
  songId: number;
}
