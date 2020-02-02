import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class LikeSongDto {
  constructor(id: string, like: boolean, playing: boolean, position: number) {
    this.id = id;
    this.like = like;
    this.playing = playing;
    this.position = position;
  }

  @ApiProperty({
    description: "The song identification",
    example: "abcdef"
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The like",
    example: false
  })
  @IsBoolean()
  like: boolean;

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
}
