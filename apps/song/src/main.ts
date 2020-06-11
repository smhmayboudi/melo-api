import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SONG_SERVICE } from "@melo/common";
import { SongModule } from "./song.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(SongModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.SONG_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.SONG_SERVICE_RETRY_DELAY || "0"),
      url: process.env.SONG_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", SONG_SERVICE);
  });
  await app.listen(process.env.SONG_PORT || 8080, () => {
    Logger.log("Nest application is listening", SONG_SERVICE);
  });
}
bootstrap();
