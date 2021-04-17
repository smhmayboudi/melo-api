import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, ValidateNested } from "class-validator";

import { ArtistResDto } from "../../../artist/dto/res/artist.res.dto";
import { Type } from "class-transformer";

export class AppArtistFollowsReqDto {
  constructor(artists: ArtistResDto[], sub: number) {
    this.artists = artists;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The artists",
  })
  @Type(() => ArtistResDto)
  @ValidateNested({
    each: true,
  })
  readonly artists: ArtistResDto[];

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
