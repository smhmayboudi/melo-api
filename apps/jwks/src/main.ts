import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { JWKS_SERVICE } from "@melo/common";
import { JwksModule } from "./jwks.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(JwksModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.JWKS_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.JWKS_SERVICE_RETRY_DELAY || "0"),
      url: process.env.JWKS_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", JWKS_SERVICE);
  });
  await app.listen(process.env.JWKS_PORT || 8080, () => {
    Logger.log("Nest application is listening", JWKS_SERVICE);
  });
}
bootstrap();
