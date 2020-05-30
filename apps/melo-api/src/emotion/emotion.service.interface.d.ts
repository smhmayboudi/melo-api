import { EmotionEmotionsReqDto, EmotionEmotionsResDto } from "@melo/common";

export interface EmotionServiceInterface {
  emotions(dto: EmotionEmotionsReqDto): Promise<EmotionEmotionsResDto[]>;
}
