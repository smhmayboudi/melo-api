import { HttpService, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { PromMethodCounter } from "../prom/prom.decorator";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionServiceInterface } from "./emotion.service.interface";

@Injectable()
// @PromInstanceCounter
export class EmotionService implements EmotionServiceInterface {
  constructor(
    private readonly emotionConfigService: EmotionConfigService,
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
    return this.httpService
      .get<DataPaginationResDto<EmotionResDto>>(
        `${this.emotionConfigService.url}/emotion/${sub}/${paramDto.from}/${paramDto.limit}`,
        {
          params: {
            emotions: queryDto.emotions
          }
        }
      )
      .pipe(map(value => value.data))
      .toPromise();
  }
}
