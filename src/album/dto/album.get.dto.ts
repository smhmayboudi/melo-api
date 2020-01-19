import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AlbumGetDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The album identification",
    example: "abcdef"
  })
  @IsNumber()
  id: string;
}
