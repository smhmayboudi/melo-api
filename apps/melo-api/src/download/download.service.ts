import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { DownloadSongReqDto, DownloadSongResDto } from "@melo/common";

import { DataElasticsearchDownloadResDto } from "@melo/common/data/dto/res/data.elasticsearch-download.res.dto";
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
        size: Math.min(dto.config.maxSize, dto.size),
        sort: {
          date: dto.orderBy,
        },
      },
      index: dto.config.indexName,
    });
    return await Promise.all(
      elasticsearchSearch.body.hits.hits.map(async (value) => {
        const song = await this.songService.get({
          ...dto,
          id: value._source.song_id,
        });
        return {
          downloadedAt: value._source.date,
          song,
        };
      })
    );
  }
}
