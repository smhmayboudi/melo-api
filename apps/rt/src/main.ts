import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RT_SERVICE } from "@melo/common";
import { RtConfigService } from "./rt.config.service";
import { RtModule } from "./rt.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(RtModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const rtConfigService = app.get(RtConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: rtConfigService.serviceRetryAttempts,
      retryDelay: rtConfigService.serviceRetryDelay,
      url: rtConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", RT_SERVICE);
  });
  await app.listen(rtConfigService.servicePort, () => {
    Logger.log("Nest application is listening", RT_SERVICE);
  });
}
bootstrap();
