import { APP_PATH_HEALTH, CommonLogger } from "@melo/common";
import { ApmModuleOptions, ApmOptionsFactory, LogLevel } from "@melo/apm";

import { AppConfigService } from "./app.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppApmOptionsFactory implements ApmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createApmOptions(): Promise<ApmModuleOptions> | ApmModuleOptions {
    return {
      active: this.appConfigService.apmActive,
      errorOnAbortedRequests: true,
      ignoreUrls: [APP_PATH_HEALTH],
      logLevel: this.appConfigService.apmLogLevel as LogLevel,
      logUncaughtExceptions: true,
      logger: CommonLogger,
      secretToken: this.appConfigService.apmSecretToken,
      serverUrl: this.appConfigService.apmServerUrl,
      serviceName: this.appConfigService.apmServiceName,
    };
  }
}
