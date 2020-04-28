import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { HttpService, Injectable } from "@nestjs/common";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionDataResDto } from "./dto/res/emotion.data.res.dto";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { PromMethodCounter } from "../prom/prom.decorator";
import { SongService } from "../song/song.service";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class EmotionService implements EmotionServiceInterface {
  constructor(
    private readonly emotionConfigService: EmotionConfigService,
    private readonly songService: SongService,
    private readonly httpService: HttpService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async emotions(
    paramDto: EmotionParamReqDto,
    queryDto: EmotionQueryReqDto,
    sub: number
  ): Promise<DataPaginationResDto<EmotionResDto>> {
    const emotionData = await this.httpService
      .get<DataPaginationResDto<EmotionDataResDto>>(
        `${this.emotionConfigService.url}/emotion/${sub}/${paramDto.from}/${paramDto.limit}`,
        {
          params: {
            emotions: queryDto.emotions,
          },
        }
      )
      .pipe(map((value) => value.data))
      .toPromise();

    return {
      results: await Promise.all(
        emotionData.results.map(
          async (value) =>
            ({
              emotions: value.emotions,
              song: await this.songService.byId({ id: value.songId }),
            } as EmotionResDto)
        )
      ),
      total: emotionData.total,
    } as DataPaginationResDto<EmotionResDto>;
  }
}
