import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class AlbumGetReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;
}
