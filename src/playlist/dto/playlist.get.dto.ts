import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PlaylistGetDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: 0
  })
  @IsString()
  id: string;
}