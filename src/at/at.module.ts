/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import { AtConfigService } from "./at.config.service";
import { AtEntityRepository } from "./at.entity.repository";
import { AtHealthIndicator } from "./at.health.indicator";
import { AtService } from "./at.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./at.config";

@Module({
  exports: [AtConfigService, AtHealthIndicator, AtService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [AtModule],
      useClass: AtCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([AtEntityRepository]),
  ],
  providers: [AtConfigService, AtHealthIndicator, AtService],
})
export class AtModule {}
