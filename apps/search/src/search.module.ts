import { ClientsModule, Transport } from "@nestjs/microservices";

import { DATA_SERVICE } from "@melo/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
  controllers: [SearchController],
  imports: [
    ClientsModule.register([
      {
        name: DATA_SERVICE,
        options: {
          url: process.env.DATA_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ElasticsearchModule.register({
      node: process.env.SEARCH_ELASTICSEARCH_NODE,
    }),
  ],
  providers: [SearchService],
})
export class SearchModule {}
