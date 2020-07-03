import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { DOWNLOAD_SERVICE } from "@melo/common";
import { DownloadConfigService } from "./download.config.service";
import { DownloadModule } from "./download.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    DownloadModule,
    new FastifyAdapter()
  );
  const downloadConfigService = app.get(DownloadConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: downloadConfigService.serviceRetryAttempts,
      retryDelay: downloadConfigService.serviceRetryDelay,
      url: downloadConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", DOWNLOAD_SERVICE);
  });
  await app.listen(downloadConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", DOWNLOAD_SERVICE);
  });
}
bootstrap();
