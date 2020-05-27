import { ConfigService } from "@nestjs/config";
import { EMOTION } from "@melo/common";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmotionConfigService implements EmotionConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticNode(): string {
    return this.configService.get<string>(`${EMOTION}.elasticNode`, "");
  }

  get indexName(): string {
    return this.configService.get<string>(`${EMOTION}.index`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${EMOTION}.maxSize`, 0);
  }
}
