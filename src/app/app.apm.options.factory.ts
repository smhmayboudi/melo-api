import { ApmModuleOptions, ApmOptionsFactory, LogLevel } from "@melo/apm";

import AppApmLogger from "./app.apm.logger";
import { AppConfigService } from "./app.config.service";
import { Injectable } from "@nestjs/common";
import { PATH_HEALTH } from "./app.constant";

@Injectable()
export class AppApmOptionsFactory implements ApmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createApmOptions(): Promise<ApmModuleOptions> | ApmModuleOptions {
    return {
      active: this.appConfigService.apmActive,
      errorOnAbortedRequests: true,
      ignoreUrls: [PATH_HEALTH],
      logLevel: this.appConfigService.apmLogLevel as LogLevel,
      logUncaughtExceptions: true,
      logger: AppApmLogger,
      secretToken: this.appConfigService.apmSecretToken,
      serverUrl: this.appConfigService.apmServerUrl,
      serviceName: this.appConfigService.apmServiceName,
    };
  }
}
