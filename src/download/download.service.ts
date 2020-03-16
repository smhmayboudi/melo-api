import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { HttpService, Injectable } from "@nestjs/common";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadConfigService } from "./download.config.service";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadServiceInterface } from "./download.service.interface";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { DownloadSortByType } from "./download.sort-by.type";
import { PromMethodCounter } from "../prom/prom.decorator";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class DownloadService implements DownloadServiceInterface {
  constructor(
    private readonly downloadConfigService: DownloadConfigService,
    private readonly httpService: HttpService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async downloadedSongs(
    paramDto: DownloadSongParamReqDto,
    queryDto: DownloadSongQueryReqDto,
    orderBy: DownloadOrderByType,
    sortBy: DownloadSortByType,
    sub: number
  ): Promise<DataPaginationResDto<DownloadSongResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DownloadSongResDto>>(
        `${this.downloadConfigService.url}/download/song/${sub}/${paramDto.from}/${paramDto.limit}`,
        {
          params: {
            filter: queryDto.filter,
            orderBy,
            sortBy
          }
        }
      )
      .pipe(map(value => value.data))
      .toPromise();
  }
}
