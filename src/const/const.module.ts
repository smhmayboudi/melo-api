/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app/app.module";
import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import config from "./const.config";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
// import { ConstHealthIndicator } from "./const.health.indicator";
import { ConstService } from "./const.service";

@Module({
  controllers: [ConstController],
  exports: [
    ConstConfigService,
    // ConstHealthIndicator,
    ConstService
  ],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [ConstModule],
      useClass: ConstCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [
    ConstConfigService,
    // ConstHealthIndicator,
    ConstService
  ]
})
export class ConstModule {}
