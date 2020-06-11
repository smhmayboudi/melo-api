import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SEARCH_SERVICE } from "@melo/common";
import { SearchModule } from "./search.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(SearchModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: parseInt(
        process.env.SEARCH_SERVICE_RETRY_ATTEMPTS || "10",
        10
      ),
      retryDelay: ms(process.env.SEARCH_SERVICE_RETRY_DELAY || "0"),
      url: process.env.SEARCH_SERVICE_URL,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", SEARCH_SERVICE);
  });
  await app.listen(process.env.SEARCH_PORT || 8080, () => {
    Logger.log("Nest application is listening", SEARCH_SERVICE);
  });
}
bootstrap();
