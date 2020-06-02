import { IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataElasticsearchSongMoodsResDto {
  constructor(
    classy: number,
    energetic: number,
    happiness: number,
    rhythm: string,
    romantic: number,
    scale: string,
    tempo: number
  ) {
    this.classy = classy;
    this.energetic = energetic;
    this.happiness = happiness;
    this.rhythm = rhythm;
    this.romantic = romantic;
    this.scale = scale;
    this.tempo = tempo;
  }

  @ApiProperty({
    description: "the classy mood",
    example: "abcdef",
  })
  @IsNumber()
  classy: number;

  @ApiProperty({
    description: "the energetic mood",
    example: "abcdef",
  })
  @IsNumber()
  energetic: number;

  @ApiProperty({
    description: "the happiness mood",
    example: 0,
  })
  @IsNumber()
  happiness: number;

  @ApiProperty({
    description: "the rythm",
    example: "abcdef",
  })
  @IsString()
  rhythm: string;

  @ApiProperty({
    description: "the romantic mood",
    example: 0,
  })
  @IsNumber()
  romantic: number;

  @ApiProperty({
    description: "the scale",
    example: "abcdef",
  })
  @IsString()
  scale: string;

  @ApiProperty({
    description: "the tempo",
    example: 0,
  })
  @IsNumber()
  tempo: number;
}
