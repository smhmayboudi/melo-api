import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { JWKS_SERVICE } from "@melo/common";
import { JwksConfigService } from "./jwks.config.service";
import { JwksModule } from "./jwks.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    JwksModule,
    new FastifyAdapter()
  );
  const jwksConfigService = app.get(JwksConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: jwksConfigService.serviceRetryAttempts,
      retryDelay: jwksConfigService.serviceRetryDelay,
      url: jwksConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", JWKS_SERVICE);
  });
  await app.listen(jwksConfigService.servicePort, "0.0.0.0", () => {
    Logger.log("Nest application is listening", JWKS_SERVICE);
  });
}
bootstrap();
