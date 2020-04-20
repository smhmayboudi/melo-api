import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class SongByIdReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The song identification",
    example: "0",
  })
  @IsNumberString()
  id: number;
}
