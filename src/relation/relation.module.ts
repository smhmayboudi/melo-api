/* eslint-disable @typescript-eslint/no-use-before-define */

import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./relation.config";
import { RelationConfigService } from "./relation.config.service";
import { RelationHealthIndicator } from "./relation.health.indicator";
import { RelationHttpOptionsFactory } from "./relation.http.options.factory";
import { RelationService } from "./relation.service";

@Module({
  exports: [RelationConfigService, RelationHealthIndicator, RelationService],
  imports: [
    ConfigModule.forFeature(config),
    HttpModule.registerAsync({
      imports: [RelationModule],
      useClass: RelationHttpOptionsFactory
    })
  ],
  providers: [RelationConfigService, RelationHealthIndicator, RelationService]
})
export class RelationModule {}
