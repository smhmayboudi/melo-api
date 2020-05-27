import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { FileModule } from "./file.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.FILE_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.FILE_SERVICE_RETRY_DELAY || "0"),
        url: process.env.FILE_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("file service is listening", "Service");
  });
}
bootstrap();
