import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from "@nestjs/elasticsearch";

import { Injectable } from "@nestjs/common";
import { SongConfigService } from "./song.config.service";

@Injectable()
export class SongElasticsearchOptionsFactory
  implements ElasticsearchOptionsFactory {
  constructor(private readonly songConfigService: SongConfigService) {}

  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions {
    return {
      node: this.songConfigService.elasticsearchNode,
    };
  }
}
