import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { JwksModule } from "./jwks.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    JwksModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.JWKS_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.JWKS_SERVICE_RETRY_DELAY || "0"),
        url: process.env.JWKS_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("jwks service is listening", "Service");
  });
}
bootstrap();
