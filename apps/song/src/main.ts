import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SongModule } from "./song.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SongModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.SONG_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.SONG_SERVICE_RETRY_DELAY || "0"),
        url: process.env.SONG_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("song service is listening", "Service");
  });
}
bootstrap();
