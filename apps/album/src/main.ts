import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ALBUM_SERVICE } from "@melo/common";
import { AlbumConfigService } from "./album.config.service";
import { AlbumModule } from "./album.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AlbumModule,
    new FastifyAdapter()
  );
  const albumConfigService = app.get(AlbumConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: albumConfigService.serviceRetryAttempts,
      retryDelay: albumConfigService.serviceRetryDelay,
      url: albumConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", ALBUM_SERVICE);
  });
  await app.listen(albumConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", ALBUM_SERVICE);
  });
}
bootstrap();
