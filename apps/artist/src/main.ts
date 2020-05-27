import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ArtistModule } from "./artist.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ArtistModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.ARTIST_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.ARTIST_SERVICE_RETRY_DELAY || "0"),
        url: process.env.ARTIST_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("artist service is listening", "Service");
  });
}
bootstrap();
