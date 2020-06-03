import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  DataElasticsearchEmotionsResDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { SongService } from "../song/song.service";

@Injectable()
// @PromInstanceCounter
export class EmotionService implements EmotionServiceInterface {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly songService: SongService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async emotions(dto: EmotionEmotionsReqDto): Promise<EmotionEmotionsResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: [{ _source: DataElasticsearchEmotionsResDto }] }>,
      any
    >({
      body: {
        _source: ["song_id", "emotions"],
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                match: {
                  user_id: dto.sub,
                },
              },
              ...dto.emotions.map((value) => ({
                term: {
                  emotions: value,
                },
              })),
            ],
          },
        },
        size: Math.min(dto.config.maxSize, dto.size),
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
          emotions: value._source.emotions,
          song,
        };
      })
    );
  }
}
