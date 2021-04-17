import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, ValidateNested } from "class-validator";

import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class AppSongLikesReqDto {
  constructor(songs: SongResDto[], sub: number) {
    this.songs = songs;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The songs",
  })
  @Type(() => SongResDto)
  @ValidateNested({
    each: true,
  })
  readonly songs: SongResDto[];

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
