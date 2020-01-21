import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class DislikeSongDto {
  constructor(
    dislike: boolean,
    playing: boolean,
    position: number,
    songId: number
  ) {
    this.dislike = dislike;
    this.playing = playing;
    this.position = position;
    this.songId = songId;
  }

  @ApiProperty({
    description: "The dislike",
    example: false
  })
  @IsBoolean()
  dislike: boolean;

  @ApiProperty({
    description: "The playing",
    example: false
  })
  @IsBoolean()
  playing: boolean;

  @ApiProperty({
    description: "The position",
    example: 0
  })
  @IsNumber()
  position: number;

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  songId: number;
}
