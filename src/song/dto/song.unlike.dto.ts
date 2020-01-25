import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SongUnlikeDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsString()
  id: number;
}
