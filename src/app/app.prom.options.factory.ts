import { Injectable } from "@nestjs/common";
import {
  PromModuleOptions,
  PromOptionsFactory
} from "../prom/prom.module.interface";
import { AppConfigService } from "./app.config.service";

@Injectable()
export class AppPromOptionsFactory implements PromOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createPromOptions(): Promise<PromModuleOptions> | PromModuleOptions {
    return {
      defaultLabels: this.appConfigService.promDefaultLabels,
      defaultMetrics: {
        enabled: this.appConfigService.promDefaultMetricsEnabled,
        config: {
          prefix: this.appConfigService.promPrefix
        }
      },
      path: this.appConfigService.promPath,
      prefix: this.appConfigService.promPrefix,
      registryName: undefined
    };
  }
}
