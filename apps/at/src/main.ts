import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AT_SERVICE } from "@melo/common";
import { AtModule } from "./at.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AtModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.AT_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.AT_SERVICE_RETRY_DELAY || "0"),
      url: process.env.AT_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", AT_SERVICE);
  });
  await app.listen(process.env.AT_PORT || 8080, () => {
    Logger.log("Nest application is listening", AT_SERVICE);
  });
}
bootstrap();
