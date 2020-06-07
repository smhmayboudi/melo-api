import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class PlaylistDeleteReqDto {
  constructor(id: string, sub: number) {
    this.id = id;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsString()
  readonly id: string;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
