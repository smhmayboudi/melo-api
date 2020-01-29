import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ConstJpgResDto {
  constructor(url: string) {
    this.url = url;
  }

  @ApiProperty({
    description: "The identification",
    example: "http://www.google.coom"
  })
  @IsString()
  url: string;
}
