import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AuthModule } from "./auth.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.AUTH_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.AUTH_SERVICE_RETRY_DELAY || "0"),
        url: process.env.AUTH_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("auth service is listening", "Service");
  });
}
bootstrap();
