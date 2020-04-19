import {
  PromModuleOptions,
  PromOptionsFactory,
} from "../prom/prom.module.interface";

import { AppConfigService } from "./app.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppPromOptionsFactory implements PromOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createPromOptions(): Promise<PromModuleOptions> | PromModuleOptions {
    return {
      defaultLabels: this.appConfigService.promDefaultLabels,
      defaultMetrics: {
        config: {
          prefix: this.appConfigService.promPrefix,
        },
        enabled: this.appConfigService.promDefaultMetricsEnabled,
      },
      path: this.appConfigService.promPath,
      prefix: this.appConfigService.promPrefix,
      registryName: undefined,
    };
  }
}
