import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PlaylistModule } from "./playlist.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PlaylistModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.PLAYLIST_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.PLAYLIST_SERVICE_RETRY_DELAY || "0"),
        url: process.env.PLAYLIST_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("playlist service is listening", "Service");
  });
}
bootstrap();
