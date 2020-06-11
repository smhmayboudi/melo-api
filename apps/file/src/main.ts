import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { FILE_SERVICE } from "@melo/common";
import { FileModule } from "./file.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(FileModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.FILE_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.FILE_SERVICE_RETRY_DELAY || "0"),
      url: process.env.FILE_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", FILE_SERVICE);
  });
  await app.listen(process.env.FILE_PORT || 8080, () => {
    Logger.log("Nest application is listening", FILE_SERVICE);
  });
}
bootstrap();
