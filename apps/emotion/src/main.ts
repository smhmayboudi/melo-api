import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { EMOTION_SERVICE } from "@melo/common";
import { EmotionModule } from "./emotion.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(EmotionModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.EMOTION_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.EMOTION_SERVICE_RETRY_DELAY || "0"),
      url: process.env.EMOTION_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", EMOTION_SERVICE);
  });
  await app.listen(process.env.EMOTION_PORT || 8080, () => {
    Logger.log("Nest application is listening", EMOTION_SERVICE);
  });
}
bootstrap();
