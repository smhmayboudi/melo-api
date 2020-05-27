import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AtModule } from "./at.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AtModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.AT_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.AT_SERVICE_RETRY_DELAY || "0"),
        url: process.env.AT_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("at service is listening", "Service");
  });
}
bootstrap();
