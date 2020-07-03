import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AT_SERVICE } from "@melo/common";
import { AtConfigService } from "./at.config.service";
import { AtModule } from "./at.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AtModule,
    new FastifyAdapter()
  );
  const atConfigService = app.get(AtConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: atConfigService.serviceRetryAttempts,
      retryDelay: atConfigService.serviceRetryDelay,
      url: atConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", AT_SERVICE);
  });
  await app.listen(atConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", AT_SERVICE);
  });
}
bootstrap();
