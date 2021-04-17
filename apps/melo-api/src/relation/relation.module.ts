import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { RELATION_SERVICE } from "@melo/common";
// import { RelationCacheOptionsFactory } from "./relation.cache.options.factory";
import { RelationConfigService } from "./relation.config.service";
import { RelationHealthIndicator } from "./relation.health.indicator";
import { RelationService } from "./relation.service";
import config from "./relation.config";

@Module({
  exports: [RelationConfigService, RelationHealthIndicator, RelationService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [RelationModule],
    //   useClass: RelationCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: RELATION_SERVICE,
        options: {
          url: process.env.RELATION_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [RelationConfigService, RelationHealthIndicator, RelationService],
})
export class RelationModule {}
