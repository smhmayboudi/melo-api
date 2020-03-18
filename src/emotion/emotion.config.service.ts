import { ConfigService } from "@nestjs/config";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { Injectable } from "@nestjs/common";
import ms from "ms";

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
