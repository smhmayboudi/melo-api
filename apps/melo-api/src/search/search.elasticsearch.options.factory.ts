import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from "@nestjs/elasticsearch";

import { Injectable } from "@nestjs/common";
import { SearchConfigService } from "./search.config.service";

@Injectable()
export class SearchElasticsearchOptionsFactory
  implements ElasticsearchOptionsFactory {
  constructor(private readonly searchConfigService: SearchConfigService) {}

  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions {
    return {
      node: this.searchConfigService.elasticsearchNode,
    };
  }
}
