import { ApiProperty } from "@nestjs/swagger";

export class Mp3Dto {
  constructor(fingerprint: string, url: string) {
    this.fingerprint = fingerprint;
    this.url = url;
  }

  @ApiProperty({
    description: "The fingerprint",
    example: "abcdef"
  })
  fingerprint: string;

  @ApiProperty({
    description: "The url",
    example: "abcdef"
  })
  url: string;
}
