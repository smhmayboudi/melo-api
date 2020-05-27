import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.USER_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.USER_SERVICE_RETRY_DELAY || "0"),
        url: process.env.USER_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("user service is listening", "Service");
  });
}
bootstrap();
