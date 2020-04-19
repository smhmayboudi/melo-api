import {
  ApmModuleOptions,
  ApmOptionsFactory,
  LogLevel,
} from "../apm/apm.module.interface";
import { PATH_HEALTH, PATH_METRICS } from "./app.constant";

import AppApmLogger from "./app.apm.logger";
import { AppConfigService } from "./app.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppApmOptionsFactory implements ApmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createApmOptions(): Promise<ApmModuleOptions> | ApmModuleOptions {
    return {
      active: this.appConfigService.apmActive,
      errorOnAbortedRequests: true,
      ignoreUrls: [PATH_HEALTH, PATH_METRICS],
      logLevel: this.appConfigService.apmLogLevel as LogLevel,
      logUncaughtExceptions: true,
      logger: AppApmLogger,
      secretToken: this.appConfigService.apmSecretToken,
      serverUrl: this.appConfigService.apmServerUrl,
      serviceName: this.appConfigService.apmServiceName,
    };
  }
}
