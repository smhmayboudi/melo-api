import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SeekSongDto {
  constructor(fromSec: number, id: string, toSec: number) {
    this.fromSec = fromSec;
    this.id = id;
    this.toSec = toSec;
  }

  @ApiProperty({
    description: "The from second",
    example: "0",
  })
  @IsNumberString()
  readonly fromSec: number;

  @ApiProperty({
    description: "The song identification",
    example: "abcdef",
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: "The to second",
    example: "0",
  })
  @IsNumberString()
  readonly toSec: number;
}
