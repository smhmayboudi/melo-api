import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from "@nestjs/elasticsearch";

import { ArtistConfigService } from "./artist.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ArtistElasticsearchOptionsFactory
  implements ElasticsearchOptionsFactory {
  constructor(private readonly artistConfigService: ArtistConfigService) {}

  createElasticsearchOptions():
    | Promise<ElasticsearchModuleOptions>
    | ElasticsearchModuleOptions {
    return {
      node: this.artistConfigService.elasticsearchNode,
    };
  }
}
