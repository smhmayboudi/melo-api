import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  EMOTION_SERVICE,
  EMOTION_SERVICE_EMOTIONS,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class EmotionService implements EmotionServiceInterface {
  constructor(
    @Inject(EMOTION_SERVICE) private readonly emotionClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async emotions(dto: EmotionEmotionsReqDto): Promise<EmotionEmotionsResDto[]> {
    return this.emotionClientProxy
      .send<EmotionEmotionsResDto[], EmotionEmotionsReqDto>(
        EMOTION_SERVICE_EMOTIONS,
        dto
      )
      .toPromise();
  }
}
