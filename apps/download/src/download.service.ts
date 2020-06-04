import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  DataElasticsearchDownloadResDto,
  DownloadSongReqDto,
  DownloadSongResDto,
  SONG_SERVICE,
  SONG_SERVICE_GET,
  SongGetReqDto,
  SongResDto,
} from "@melo/common";
import { Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";

import { DownloadConfigService } from "./download.config.service";
import { DownloadServiceInterface } from "./download.service.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class DownloadService implements DownloadServiceInterface {
  constructor(
    @Inject(SONG_SERVICE) private readonly songClientProxy: ClientProxy,
    private readonly downloadConfigService: DownloadConfigService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async downloadedSongs(
    dto: DownloadSongReqDto
  ): Promise<DownloadSongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: [{ _source: DataElasticsearchDownloadResDto }] }>,
      any
    >({
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
                      match: {
                        song_unique_name: dto.filter,
                      },
                    },
                    {
                      term: {
                        user_id: dto.sub,
                      },
                    },
                  ],
                },
              },
        size: Math.min(this.downloadConfigService.maxSize, dto.size),
        sort: {
          date: dto.orderBy,
        },
      },
      index: this.downloadConfigService.indexName,
    });
    return await Promise.all(
      elasticsearchSearch.body.hits.hits.map(async (value) => {
        const song = await this.songClientProxy
          .send<SongResDto, SongGetReqDto>(SONG_SERVICE_GET, {
            ...dto,
            id: value._source.song_id,
          })
          .toPromise();
        return {
          downloadedAt: value._source.date,
          song,
        };
      })
    );
  }
}
