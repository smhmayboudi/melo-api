import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { SongService } from "../song/song.service";

@Injectable()
// @PromInstanceCounter
export class EmotionService implements EmotionServiceInterface {
  constructor(
    private readonly emotionConfigService: EmotionConfigService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly songService: SongService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async emotions(
    paramDto: EmotionParamReqDto,
    queryDto: EmotionQueryReqDto,
    sub: number
  ): Promise<DataPaginationResDto<EmotionResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: ["song_id", "emotions"],
        from: paramDto.from,
        query: {
          bool: {
            must: [
              {
                match: {
                  user_id: sub,
                },
              },
              ...queryDto.emotions.map((value) => ({
                term: { emotions: value },
              })),
            ],
          },
        },
        size: Math.min(paramDto.size, this.emotionConfigService.requestLimit),
      },
      index: this.emotionConfigService.index,
    });
    return {
      results: (await Promise.all(
        elasticSearchRes.body.hits.hits.map(async (value) => ({
          emotions: value._source.emotions,
          song: await this.songService.byId({ id: value._source.song_Id }),
        }))
      )) as EmotionResDto[],
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<EmotionResDto>;
  }
}
