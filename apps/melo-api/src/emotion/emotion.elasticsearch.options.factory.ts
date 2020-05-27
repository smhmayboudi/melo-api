import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from "@nestjs/elasticsearch";

import { EmotionConfigService } from "./emotion.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmotionElasticsearchOptionsFactory
  implements ElasticsearchOptionsFactory {
  constructor(private readonly emotionConfigService: EmotionConfigService) {}

  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions {
    return {
      node: this.emotionConfigService.elasticNode,
    };
  }
}
