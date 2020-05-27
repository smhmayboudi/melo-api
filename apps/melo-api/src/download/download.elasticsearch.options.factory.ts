import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from "@nestjs/elasticsearch";

import { DownloadConfigService } from "./download.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DownloadElasticsearchOptionsFactory
  implements ElasticsearchOptionsFactory {
  constructor(private readonly downloadConfigService: DownloadConfigService) {}

  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions {
    return {
      node: this.downloadConfigService.elasticNode,
    };
  }
}
