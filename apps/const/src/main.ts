import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ConstModule } from "./const.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ConstModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.CONST_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.CONST_SERVICE_RETRY_DELAY || "0"),
        url: process.env.CONST_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("const service is listening", "Service");
  });
}
bootstrap();
