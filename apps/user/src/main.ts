import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { USER_SERVICE } from "@melo/common";
import { UserConfigService } from "./user.config.service";
import { UserModule } from "./user.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const userConfigService = app.get(UserConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: userConfigService.serviceRetryAttempts,
      retryDelay: userConfigService.serviceRetryDelay,
      url: userConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", USER_SERVICE);
  });
  await app.listen(userConfigService.servicePort, () => {
    Logger.log("Nest application is listening", USER_SERVICE);
  });
}
bootstrap();
