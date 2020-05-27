import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { DataModule } from "./data.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DataModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.DATA_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.DATA_SERVICE_RETRY_DELAY || "0"),
        url: process.env.DATA_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("data service is listening", "Service");
  });
}
bootstrap();
