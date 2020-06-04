import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AlbumModule } from "./album.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AlbumModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.ALBUM_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.ALBUM_SERVICE_RETRY_DELAY || "0"),
        url: process.env.ALBUM_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("album service is listening", "Service");
  });
}
bootstrap();
