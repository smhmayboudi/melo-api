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
      path: "/metrics",
      defaultMetrics: {
        enabled: true,
        config: {
          prefix: this.appConfigService.promPrefix
        }
      }
    };
  }
}
