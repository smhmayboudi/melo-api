import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SONG_SERVICE,
  SONG_SERVICE_GET,
  SearchElasticsearchEmotionsResDto,
  SongGetReqDto,
  SongResDto,
} from "@melo/common";
import { Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class EmotionService implements EmotionServiceInterface {
  constructor(
    @Inject(SONG_SERVICE) private readonly songClientProxy: ClientProxy,
    private readonly emotionConfigService: EmotionConfigService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async emotions(dto: EmotionEmotionsReqDto): Promise<EmotionEmotionsResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<
        string,
        { hits: [{ _source: SearchElasticsearchEmotionsResDto }] }
      >,
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
        size: Math.min(this.emotionConfigService.maxSize, dto.size),
      },
      index: this.emotionConfigService.indexName,
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
          emotions: value._source.emotions,
          song,
        };
      })
    );
  }
}
