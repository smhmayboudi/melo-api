import {
  DataPaginationResDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";

export interface EmotionServiceInterface {
  emotions(
    dto: EmotionEmotionsReqDto
  ): Promise<DataPaginationResDto<EmotionEmotionsResDto>>;
}
