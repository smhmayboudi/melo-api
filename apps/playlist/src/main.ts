import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PLAYLIST_SERVICE } from "@melo/common";
import { PlaylistModule } from "./playlist.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(PlaylistModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.PLAYLIST_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.PLAYLIST_SERVICE_RETRY_DELAY || "0"),
      url: process.env.PLAYLIST_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", PLAYLIST_SERVICE);
  });
  await app.listen(process.env.PLAYLIST_PORT || 8080, () => {
    Logger.log("Nest application is listening", PLAYLIST_SERVICE);
  });
}
bootstrap();
