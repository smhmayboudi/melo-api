import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AlbumGetDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The album identification",
    example: "abcdef"
  })
  @IsString()
  id: string;
}
