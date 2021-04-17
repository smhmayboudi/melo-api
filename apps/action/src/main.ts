import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ACTION_SERVICE } from "@melo/common";
import { ActionConfigService } from "./action.config.service";
import { ActionModule } from "./action.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ActionModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const actionConfigService = app.get(ActionConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      retryAttempts: actionConfigService.serviceRetryAttempts,
      retryDelay: actionConfigService.serviceRetryDelay,
      url: actionConfigService.serviceUrl,
    },
    transport: Transport.REDIS,
  });
  app.startAllMicroservices(() => {
    Logger.log("Nest microservice is listening", ACTION_SERVICE);
  });
  await app.listen(actionConfigService.servicePort, () => {
    Logger.log("Nest application is listening", ACTION_SERVICE);
  });
}
bootstrap();
