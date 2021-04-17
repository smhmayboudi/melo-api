import { ApiProperty } from "@nestjs/swagger";
import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class AppSongLocalizeReqDto {
  constructor(song: SongResDto) {
    this.song = song;
  }

  @ApiProperty({
    description: "The song",
  })
  @Type(() => SongResDto)
  @ValidateNested()
  readonly song: SongResDto;
}
