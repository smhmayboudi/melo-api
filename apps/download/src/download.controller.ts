import {
  DOWNLOAD_SERVICE_DOWNLOADED_SONGS,
  DownloadSongReqDto,
  DownloadSongResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { DownloadService } from "./download.service";

@Controller()
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @MessagePattern(DOWNLOAD_SERVICE_DOWNLOADED_SONGS)
  downloadedSongs(
    @Payload() dto: DownloadSongReqDto
  ): Promise<DownloadSongResDto[]> {
    return this.downloadService.downloadedSongs(dto);
  }
}
