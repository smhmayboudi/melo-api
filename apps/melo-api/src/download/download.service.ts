import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  DOWNLOAD_SERVICE,
  DOWNLOAD_SERVICE_DOWNLOADED_SONGS,
  DownloadSongReqDto,
  DownloadSongResDto,
} from "@melo/common";

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { DownloadServiceInterface } from "./download.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class DownloadService implements DownloadServiceInterface {
  constructor(
    @Inject(DOWNLOAD_SERVICE) private readonly downloadClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async downloadedSongs(
    dto: DownloadSongReqDto
  ): Promise<DownloadSongResDto[]> {
    return this.downloadClientProxy
      .send<DownloadSongResDto[], DownloadSongReqDto>(
        DOWNLOAD_SERVICE_DOWNLOADED_SONGS,
        dto
      )
      .toPromise();
  }
}
