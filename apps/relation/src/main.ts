import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RELATION_SERVICE } from "@melo/common";
import { RelationModule } from "./relation.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(RelationModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.RELATION_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.RELATION_SERVICE_RETRY_DELAY || "0"),
      url: process.env.RELATION_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", RELATION_SERVICE);
  });
  await app.listen(process.env.RELATION_PORT || 8080, () => {
    Logger.log("Nest application is listening", RELATION_SERVICE);
  });
}
bootstrap();
