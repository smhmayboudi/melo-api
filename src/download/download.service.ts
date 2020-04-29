import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { HttpService, Injectable } from "@nestjs/common";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadConfigService } from "./download.config.service";
import { DownloadDataSongResDto } from "./dto/res/download.data.song.res.dto";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadServiceInterface } from "./download.service.interface";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { DownloadSortByType } from "./download.sort-by.type";
import { PromMethodCounter } from "../prom/prom.decorator";
import { SongService } from "../song/song.service";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class DownloadService implements DownloadServiceInterface {
  constructor(
    private readonly downloadConfigService: DownloadConfigService,
    private readonly httpService: HttpService,
    private readonly songService: SongService
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
    const downloadDataSong = await this.httpService
      .get<DataPaginationResDto<DownloadDataSongResDto>>(
        `${this.downloadConfigService.url}/download/song/${sub}/${paramDto.from}/${paramDto.limit}`,
        {
          params: {
            filter: queryDto.filter,
            orderBy,
            sortBy,
          },
        }
      )
      .pipe(map((value) => value.data))
      .toPromise();
    return {
      results: await Promise.all(
        downloadDataSong.results.map(async (value) => ({
          downloadedAt: value.downloadedAt,
          song: await this.songService.byId({ id: value.songId }),
        }))
      ),
      total: downloadDataSong.total,
    } as DataPaginationResDto<DownloadSongResDto>;
  }
}
