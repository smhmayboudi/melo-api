import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { TAG_SERVICE } from "@melo/common";
import { TagConfigService } from "./tag.config.service";
import { TagModule } from "./tag.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    TagModule,
    new FastifyAdapter()
  );
  const tagConfigService = app.get(TagConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: tagConfigService.serviceRetryAttempts,
      retryDelay: tagConfigService.serviceRetryDelay,
      url: tagConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", TAG_SERVICE);
  });
  await app.listen(tagConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest applictagion is listening", TAG_SERVICE);
  });
}
bootstrap();
