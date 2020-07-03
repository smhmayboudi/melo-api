import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PLAYLIST_SERVICE } from "@melo/common";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistModule } from "./playlist.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    PlaylistModule,
    new FastifyAdapter()
  );
  const playlistConfigService = app.get(PlaylistConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: playlistConfigService.serviceRetryAttempts,
      retryDelay: playlistConfigService.serviceRetryDelay,
      url: playlistConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", PLAYLIST_SERVICE);
  });
  await app.listen(playlistConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", PLAYLIST_SERVICE);
  });
}
bootstrap();
