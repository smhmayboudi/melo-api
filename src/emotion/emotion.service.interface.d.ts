import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";

export interface EmotionServiceInterface {
  emotions(
    paramDto: EmotionParamReqDto,
    queryDto: EmotionQueryReqDto,
    sub: number
  ): Promise<DataPaginationResDto<EmotionResDto>>;
}
