import { IsDate, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { DataSongResDto } from "src/data/dto/res/data.song.res.dto";

export class DownloadSongResDto {
  constructor(song: DataSongResDto, downloadedAt: Date) {
    this.song = song;
    this.downloadedAt = downloadedAt;
  }

  @ApiProperty({
    description: "The song",
    example: 0
  })
  @ValidateNested()
  song: DataSongResDto;

  @ApiProperty({
    description: "The date of download",
    example: new Date()
  })
  @IsDate()
  downloadedAt: Date;
}
