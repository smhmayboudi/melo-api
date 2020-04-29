/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { RelationCacheOptionsFactory } from "./relation.cache.options.factory";
import { RelationConfigService } from "./relation.config.service";
import { RelationHealthIndicator } from "./relation.health.indicator";
import { RelationService } from "./relation.service";
import config from "./relation.config";

@Module({
  exports: [RelationConfigService, RelationHealthIndicator, RelationService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [RelationModule],
      useClass: RelationCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
  ],
  providers: [RelationConfigService, RelationHealthIndicator, RelationService],
})
export class RelationModule {}
