/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstHealthIndicator } from "./const.health.indicator";
import { ConstService } from "./const.service";
import config from "./const.config";

@Module({
  controllers: [ConstController],
  exports: [ConstConfigService, ConstHealthIndicator, ConstService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [ConstModule],
      useClass: ConstCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
  ],
  providers: [ConstConfigService, ConstHealthIndicator, ConstService],
})
export class ConstModule {}
