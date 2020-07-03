import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SEARCH_SERVICE } from "@melo/common";
import { SearchConfigService } from "./search.config.service";
import { SearchModule } from "./search.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    SearchModule,
    new FastifyAdapter()
  );
  const searchConfigService = app.get(SearchConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: searchConfigService.serviceRetryAttempts,
      retryDelay: searchConfigService.serviceRetryDelay,
      url: searchConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", SEARCH_SERVICE);
  });
  await app.listen(searchConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", SEARCH_SERVICE);
  });
}
bootstrap();
