import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, ValidateNested } from "class-validator";

import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class AppSongLikeReqDto {
  constructor(song: SongResDto, sub: number) {
    this.song = song;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The song",
  })
  @Type(() => SongResDto)
  @ValidateNested()
  readonly song: SongResDto;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
