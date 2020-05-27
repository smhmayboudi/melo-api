import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RelationModule } from "./relation.module";
import ms from "ms";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RelationModule,
    {
      options: {
        retryAttempts: parseInt(
          process.env.RELATION_SERVICE_RETRY_ATTEMPTS || "10",
          10
        ),
        retryDelay: ms(process.env.RELATION_SERVICE_RETRY_DELAY || "0"),
        url: process.env.RELATION_SERVICE_URL,
      },
      transport: Transport.REDIS,
    }
  );
  app.listen(() => {
    Logger.log("relation service is listening", "Service");
  });
}
bootstrap();
