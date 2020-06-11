import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RT_SERVICE } from "@melo/common";
import { RtModule } from "./rt.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(RtModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.RT_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.RT_SERVICE_RETRY_DELAY || "0"),
      url: process.env.RT_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", RT_SERVICE);
  });
  await app.listen(process.env.RT_PORT || 8080, () => {
    Logger.log("Nest application is listening", RT_SERVICE);
  });
}
bootstrap();
