import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AlbumByIdReqDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: ""
  })
  @IsString()
  id: string;
}
