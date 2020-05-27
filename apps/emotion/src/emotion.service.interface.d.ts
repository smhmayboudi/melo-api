import {
  DataPaginationResDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";

export interface EmotionServiceInterface {
  emotions(
    paramDto: EmotionEmotionsReqDto
  ): Promise<DataPaginationResDto<EmotionEmotionsResDto>>;
}
