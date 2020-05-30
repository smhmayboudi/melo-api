import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from "@nestjs/elasticsearch";

import { DataConfigService } from "./data.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DataElasticsearchOptionsFactory
  implements ElasticsearchOptionsFactory {
  constructor(private readonly dataConfigService: DataConfigService) {}

  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions {
    return {
      node: this.dataConfigService.elasticsearchNode,
    };
  }
}
