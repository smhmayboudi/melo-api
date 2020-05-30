import { EmotionEmotionsReqDto, EmotionEmotionsResDto } from "@melo/common";

export interface EmotionServiceInterface {
  emotions(paramDto: EmotionEmotionsReqDto): Promise<EmotionEmotionsResDto[]>;
}
