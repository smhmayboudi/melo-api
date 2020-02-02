import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ArtistMp3ResDto {
  constructor(fingerprint: string, url: string) {
    this.fingerprint = fingerprint;
    this.url = url;
  }

  @ApiProperty({
    description: "The fingerprint",
    example: "abcdef"
  })
  @IsString()
  fingerprint: string;

  @ApiProperty({
    description: "The url",
    example: "http://..."
  })
  @IsString()
  url: string;
}
