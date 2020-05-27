import {
  DataPaginationResDto,
  EMOTION_SERVICE_EMOTIONS,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { EmotionService } from "./emotion.service";

@Controller()
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  @MessagePattern(EMOTION_SERVICE_EMOTIONS)
  emotions(
    @Payload() dto: EmotionEmotionsReqDto
  ): Promise<DataPaginationResDto<EmotionEmotionsResDto>> {
    return this.emotionService.emotions(dto);
  }
}
