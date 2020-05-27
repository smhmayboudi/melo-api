import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RtModule } from "./rt.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RtModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.RT_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.RT_SERVICE_RETRY_DELAY || "0"),
        url: process.env.RT_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("rt service is listening", "Service");
  });
}
bootstrap();
