import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  DataPaginationResDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SONG_SERVICE,
  SONG_SERVICE_GET,
  SongGetReqDto,
  SongResDto,
} from "@melo/common";
import { Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class EmotionService implements EmotionServiceInterface {
  constructor(
    @Inject(SONG_SERVICE) private readonly clientProxy: ClientProxy,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async emotions(
    dto: EmotionEmotionsReqDto
  ): Promise<DataPaginationResDto<EmotionEmotionsResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
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
                term: { emotions: value },
              })),
            ],
          },
        },
        size: Math.min(dto.config.maxSize, dto.size),
      },
      index: dto.config.indexName,
    });
    const results = (await Promise.all(
      elasticSearchRes.body.hits.hits.map(async (value) => ({
        emotions: value._source.emotions,
        song: await this.clientProxy
          .send<SongResDto, SongGetReqDto>(SONG_SERVICE_GET, {
            ...dto,
            id: value._source.song_Id,
          })
          .toPromise(),
      }))
    )) as EmotionEmotionsResDto[];
    return {
      results,
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<EmotionEmotionsResDto>;
  }
}
