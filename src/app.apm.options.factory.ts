import { Injectable } from "@nestjs/common";
// import { ApmLogger } from "./apm/apm.logger";
import {
  ApmModuleOptions,
  ApmOptionsFactory,
  LogLevel
} from "./apm/apm.module.interface";
import { AppConfigService } from "./app.config.service";
import { PATH_HEALTH, PATH_METRICS } from "./app.constant";

@Injectable()
export class AppApmOptionsFactory implements ApmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createApmOptions(): Promise<ApmModuleOptions> | ApmModuleOptions {
    return {
      errorOnAbortedRequests: true,
      ignoreUrls: [PATH_HEALTH, PATH_METRICS],
      // logger: ApmLogger,
      logLevel: this.appConfigService.apmLogLevel as LogLevel,
      logUncaughtExceptions: true,
      secretToken: this.appConfigService.apmSecretToken,
      serverUrl: this.appConfigService.apmServerUrl,
      serviceName: this.appConfigService.apmServiceName
    };
  }
}
