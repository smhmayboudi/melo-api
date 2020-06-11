import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ALBUM_SERVICE } from "@melo/common";
import { AlbumModule } from "./album.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AlbumModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.ALBUM_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.ALBUM_SERVICE_RETRY_DELAY || "0"),
      url: process.env.ALBUM_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", ALBUM_SERVICE);
  });
  await app.listen(process.env.ALBUM_PORT || 8080, () => {
    Logger.log("Nest application is listening", ALBUM_SERVICE);
  });
}
bootstrap();
