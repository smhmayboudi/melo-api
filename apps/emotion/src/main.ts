import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { EmotionModule } from "./emotion.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmotionModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.EMOTION_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.EMOTION_SERVICE_RETRY_DELAY || "0"),
        url: process.env.EMOTION_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("emotion service is listening", "Service");
  });
}
bootstrap();
