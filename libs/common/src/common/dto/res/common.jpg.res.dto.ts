import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CommonJpgResDto {
  constructor(url: string) {
    this.url = url;
  }

  @ApiProperty({
    description: "The identification",
    example: "http://www.google.coom",
  })
  @IsString()
  readonly url: string;
}
