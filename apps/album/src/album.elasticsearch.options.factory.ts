import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from "@nestjs/elasticsearch";

import { AlbumConfigService } from "./album.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AlbumElasticsearchOptionsFactory
  implements ElasticsearchOptionsFactory {
  constructor(private readonly albumConfigService: AlbumConfigService) {}

  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions {
    return {
      node: this.albumConfigService.elasticsearchNode,
    };
  }
}
