import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ActionTestDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsString()
  id: string;
}
