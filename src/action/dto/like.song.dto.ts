import { IsBoolean, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LikeSongDto {
  constructor(id: string, like: boolean, playing: boolean, position: number) {
    this.id = id;
    this.like = like;
    this.playing = playing;
    this.position = position;
  }

  @ApiProperty({
    description: "The song identification",
    example: "abcdef",
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: "The like",
    example: false,
  })
  @IsBoolean()
  readonly like: boolean;

  @ApiProperty({
    description: "The playing",
    example: false,
  })
  @IsBoolean()
  readonly playing: boolean;

  @ApiProperty({
    description: "The position",
    example: "0",
  })
  @IsNumberString()
  readonly position: number;
}
