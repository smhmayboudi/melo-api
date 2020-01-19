import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ArtistUnfollowDto {
  constructor(artistId: string) {
    this.artistId = artistId;
  }

  @ApiProperty({
    description: "The artist identification",
    example: "abcdef"
  })
  @IsString()
  artistId: string;
}
