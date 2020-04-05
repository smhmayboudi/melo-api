import { IsDate, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DownloadDataSongResDto {
  constructor(songId: string, downloadedAt: Date) {
    this.songId = songId;
    this.downloadedAt = downloadedAt;
  }

  @ApiProperty({
    description: "The song id",
    example: 0
  })
  @IsNumber()
  songId: string;

  @ApiProperty({
    description: "The date of download",
    example: new Date()
  })
  @IsDate()
  downloadedAt: Date;
}
