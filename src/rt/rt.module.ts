/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app/app.module";
import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import config from "./rt.config";
import { RtConfigService } from "./rt.config.service";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtHealthIndicator } from "./rt.health.indicator";
import { RtService } from "./rt.service";

@Module({
  exports: [RtConfigService, RtHealthIndicator, RtService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [RtModule],
      useClass: RtCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([RtEntityRepository])
  ],
  providers: [RtConfigService, RtHealthIndicator, RtService]
})
export class RtModule {}
