import { IsDate, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class DownloadSongResDto {
  constructor(song: SongResDto, downloadedAt: Date) {
    this.song = song;
    this.downloadedAt = downloadedAt;
  }

  @ApiProperty({
    description: "The song",
    example: "0",
  })
  @Type(() => SongResDto)
  @ValidateNested()
  readonly song: SongResDto;

  @ApiProperty({
    description: "The date of download",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly downloadedAt: Date;
}
