import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ActionModule } from "./action.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ActionModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.ACTION_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.ACTION_SERVICE_RETRY_DELAY || "0"),
        url: process.env.ACTION_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("action service is listening", "Service");
  });
}
bootstrap();
