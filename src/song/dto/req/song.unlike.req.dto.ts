import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SongUnlikeReqDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsString()
  id: string;
}
