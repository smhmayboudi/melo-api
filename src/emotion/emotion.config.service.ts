import { ConfigService } from "@nestjs/config";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmotionConfigService implements EmotionConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticNode(): string {
    return this.configService.get<string>("emotion.elasticNode", "");
  }

  get index(): string {
    return this.configService.get<string>("emotion.index", "");
  }

  get resultSize(): number {
    return this.configService.get<number>("emotion.resultSize", 0);
  }
}
