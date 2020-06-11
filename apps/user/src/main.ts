import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { USER_SERVICE } from "@melo/common";
import { UserModule } from "./user.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.USER_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.USER_SERVICE_RETRY_DELAY || "0"),
      url: process.env.USER_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", USER_SERVICE);
  });
  await app.listen(process.env.USER_PORT || 8080, () => {
    Logger.log("Nest application is listening", USER_SERVICE);
  });
}
bootstrap();
