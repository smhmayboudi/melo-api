import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { FILE_SERVICE } from "@melo/common";
import { FileConfigService } from "./file.config.service";
import { FileModule } from "./file.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(FileModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const fileConfigService = app.get(FileConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: fileConfigService.serviceRetryAttempts,
      retryDelay: fileConfigService.serviceRetryDelay,
      url: fileConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", FILE_SERVICE);
  });
  await app.listen(fileConfigService.servicePort, () => {
    Logger.log("Nest application is listening", FILE_SERVICE);
  });
}
bootstrap();
