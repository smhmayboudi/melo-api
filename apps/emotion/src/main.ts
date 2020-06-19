import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { EMOTION_SERVICE } from "@melo/common";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionModule } from "./emotion.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(EmotionModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const emotionConfigService = app.get(EmotionConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: emotionConfigService.serviceRetryAttempts,
      retryDelay: emotionConfigService.serviceRetryDelay,
      url: emotionConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", EMOTION_SERVICE);
  });
  await app.listen(emotionConfigService.servicePort, () => {
    Logger.log("Nest application is listening", EMOTION_SERVICE);
  });
}
bootstrap();
