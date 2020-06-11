import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ACTION_SERVICE } from "@melo/common";
import { ActionModule } from "./action.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ActionModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.ACTION_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.ACTION_SERVICE_RETRY_DELAY || "0"),
      url: process.env.ACTION_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", ACTION_SERVICE);
  });
  await app.listen(process.env.ACTION_PORT || 8080, () => {
    Logger.log("Nest application is listening", ACTION_SERVICE);
  });
}
bootstrap();
