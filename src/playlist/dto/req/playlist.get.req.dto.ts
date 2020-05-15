import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PlaylistGetReqDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsString()
  readonly id: string;
}
