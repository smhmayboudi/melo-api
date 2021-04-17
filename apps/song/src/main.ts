import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SONG_SERVICE } from "@melo/common";
import { SongConfigService } from "./song.config.service";
import { SongModule } from "./song.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(SongModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const songConfigService = app.get(SongConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: songConfigService.serviceRetryAttempts,
      retryDelay: songConfigService.serviceRetryDelay,
      url: songConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", SONG_SERVICE);
  });
  await app.listen(songConfigService.servicePort, () => {
    Logger.log("Nest application is listening", SONG_SERVICE);
  });
}
bootstrap();
