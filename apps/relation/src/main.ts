import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RELATION_SERVICE } from "@melo/common";
import { RelationConfigService } from "./relation.config.service";
import { RelationModule } from "./relation.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    RelationModule,
    new FastifyAdapter()
  );
  const relationConfigService = app.get(RelationConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: relationConfigService.serviceRetryAttempts,
      retryDelay: relationConfigService.serviceRetryDelay,
      url: relationConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", RELATION_SERVICE);
  });
  await app.listen(relationConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", RELATION_SERVICE);
  });
}
bootstrap();
