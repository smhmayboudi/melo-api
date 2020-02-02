import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class PauseSongDto {
  constructor(currentPosition: number, id: string) {
    this.currentPosition = currentPosition;
    this.id = id;
  }

  @ApiProperty({
    description: "The current position",
    example: 0
  })
  @IsNumber()
  currentPosition: number;

  @ApiProperty({
    description: "The song identification",
    example: "abcdef"
  })
  @IsString()
  id: string;
}
