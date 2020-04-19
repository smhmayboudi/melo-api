import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from "@nestjs/common";
import { EmotionConfigService } from "./emotion.config.service";

@Injectable()
export class EmotionHttpOptionsFactory implements HttpModuleOptionsFactory {
  constructor(private readonly emotionConfigService: EmotionConfigService) {}

  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
    return {
      timeout: this.emotionConfigService.timeout,
    };
  }
}
