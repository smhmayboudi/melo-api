import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ARTIST_SERVICE } from "@melo/common";
import { ArtistModule } from "./artist.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ArtistModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.ARTIST_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.ARTIST_SERVICE_RETRY_DELAY || "0"),
      url: process.env.ARTIST_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", ARTIST_SERVICE);
  });
  await app.listen(process.env.ARTIST_PORT || 8080, () => {
    Logger.log("Nest application is listening", ARTIST_SERVICE);
  });
}
bootstrap();
