/* eslint-disable @typescript-eslint/camelcase */
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadConfigService } from "./download.config.service";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadServiceInterface } from "./download.service.interface";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { SongService } from "../song/song.service";

@Injectable()
// @PromInstanceCounter
export class DownloadService implements DownloadServiceInterface {
  constructor(
    private readonly downloadConfigService: DownloadConfigService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly songService: SongService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async downloadedSongs(
    paramDto: DownloadSongParamReqDto,
    queryDto: DownloadSongQueryReqDto,
    orderBy: DownloadOrderByType,
    sub: number
  ): Promise<DataPaginationResDto<DownloadSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: ["song_id", "date"],
        from: paramDto.from,
        query:
          queryDto.filter === undefined
            ? {
                term: {
                  user_id: sub,
                },
              }
            : {
                bool: {
                  must: [
                    {
                      match: { song_unique_name: queryDto.filter },
                    },
                    {
                      term: { user_id: sub },
                    },
                  ],
                },
              },
        size: Math.min(paramDto.limit, this.downloadConfigService.requestLimit),
        sort: { date: orderBy },
      },
      index: this.downloadConfigService.index,
    });
    return {
      results: (await Promise.all(
        elasticSearchRes.body.hits.hits.map(async (value) => ({
          downloadedAt: value._source.date,
          song: await this.songService.byId({ id: value._source.song_id }),
        }))
      )) as DownloadSongResDto[],
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DownloadSongResDto>;
  }
}
