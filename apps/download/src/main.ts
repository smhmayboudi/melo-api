import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { DOWNLOAD_SERVICE } from "@melo/common";
import { DownloadModule } from "./download.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(DownloadModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.DOWNLOAD_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.DOWNLOAD_SERVICE_RETRY_DELAY || "0"),
      url: process.env.DOWNLOAD_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", DOWNLOAD_SERVICE);
  });
  await app.listen(process.env.DOWNLOAD_PORT || 8080, () => {
    Logger.log("Nest application is listening", DOWNLOAD_SERVICE);
  });
}
bootstrap();
