import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ARTIST_SERVICE } from "@melo/common";
import { ArtistConfigService } from "./artist.config.service";
import { ArtistModule } from "./artist.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ArtistModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const artistConfigService = app.get(ArtistConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: artistConfigService.serviceRetryAttempts,
      retryDelay: artistConfigService.serviceRetryDelay,
      url: artistConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", ARTIST_SERVICE);
  });
  await app.listen(artistConfigService.servicePort, () => {
    Logger.log("Nest application is listening", ARTIST_SERVICE);
  });
}
bootstrap();
