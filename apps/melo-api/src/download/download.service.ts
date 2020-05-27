import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  DataPaginationResDto,
  DownloadSongReqDto,
  DownloadSongResDto,
} from "@melo/common";

import { DownloadServiceInterface } from "./download.service.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { SongService } from "../song/song.service";

@Injectable()
// @PromInstanceCounter
export class DownloadService implements DownloadServiceInterface {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly songService: SongService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async downloadedSongs(
    dto: DownloadSongReqDto
  ): Promise<DataPaginationResDto<DownloadSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: ["song_id", "date"],
        from: dto.from,
        query:
          dto.filter === undefined
            ? {
                term: {
                  user_id: dto.sub,
                },
              }
            : {
                bool: {
                  must: [
                    {
                      match: { song_unique_name: dto.filter },
                    },
                    {
                      term: { user_id: dto.sub },
                    },
                  ],
                },
              },
        size: Math.min(dto.config.maxSize, dto.size),
        sort: { date: dto.orderBy },
      },
      index: dto.config.indexName,
    });
    const results = (await Promise.all(
      elasticSearchRes.body.hits.hits.map(async (value) => ({
        downloadedAt: value._source.date,
        song: await this.songService.get({
          ...dto,
          id: value._source.song_id,
        }),
      }))
    )) as DownloadSongResDto[];
    return {
      results,
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DownloadSongResDto>;
  }
}
