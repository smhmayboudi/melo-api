import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { CONST_SERVICE } from "@melo/common";
import { ConstConfigService } from "./const.config.service";
import { ConstModule } from "./const.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    ConstModule,
    new FastifyAdapter()
  );
  const constConfigService = app.get(ConstConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: constConfigService.serviceRetryAttempts,
      retryDelay: constConfigService.serviceRetryDelay,
      url: constConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", CONST_SERVICE);
  });
  await app.listen(constConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", CONST_SERVICE);
  });
}
bootstrap();
