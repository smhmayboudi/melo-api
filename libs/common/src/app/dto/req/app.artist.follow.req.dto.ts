import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, ValidateNested } from "class-validator";

import { ArtistResDto } from "../../../artist/dto/res/artist.res.dto";
import { Type } from "class-transformer";

export class AppArtistFollowReqDto {
  constructor(artist: ArtistResDto, sub: number) {
    this.artist = artist;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The artist",
  })
  @Type(() => ArtistResDto)
  @ValidateNested()
  readonly artist: ArtistResDto;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
