import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SearchModule } from "./search.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.SEARCH_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.SEARCH_SERVICE_RETRY_DELAY || "0"),
        url: process.env.SEARCH_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("search service is listening", "Service");
  });
}
bootstrap();
