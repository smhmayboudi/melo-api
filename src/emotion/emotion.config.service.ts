import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";

@Injectable()
export class EmotionConfigService implements EmotionConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return ms(this.configService.get<string>("emotion.timeout", "0"));
  }

  get url(): string {
    return this.configService.get<string>("emotion.url", "");
  }
}
