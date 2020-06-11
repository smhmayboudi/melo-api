import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { CONST_SERVICE } from "@melo/common";
import { ConstModule } from "./const.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ConstModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.CONST_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.CONST_SERVICE_RETRY_DELAY || "0"),
      url: process.env.CONST_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", CONST_SERVICE);
  });
  await app.listen(process.env.CONST_PORT || 8080, () => {
    Logger.log("Nest application is listening", CONST_SERVICE);
  });
}
bootstrap();
