import { ApiProperty } from "@nestjs/swagger";

export class JpgDto {
  constructor(url: string) {
    this.url = url;
  }

  @ApiProperty({
    description: "The identification",
    example: "http://www.google.coom"
  })
  url: string;
}
