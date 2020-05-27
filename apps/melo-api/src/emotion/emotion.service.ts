import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  DataPaginationResDto,
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
        song: await this.songService.get({
          ...dto,
          id: value._source.song_Id,
        }),
      }))
    )) as EmotionEmotionsResDto[];
    return {
      results,
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<EmotionEmotionsResDto>;
  }
}
