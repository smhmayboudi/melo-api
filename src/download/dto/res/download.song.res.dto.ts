import { IsDate, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DownloadSongResDto {
  constructor(songId: number, downloadedAt: Date) {
    this.songId = songId;
    this.downloadedAt = downloadedAt;
  }

  @ApiProperty({
    description: "The song id",
    example: 0
  })
  @IsNumber()
  songId: number;

  @ApiProperty({
    description: "The date of download",
    example: new Date()
  })
  @IsDate()
  downloadedAt: Date;
}
