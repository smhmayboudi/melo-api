/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import { ActionConfigService } from "./action.config.service";
import { ActionController } from "./action.controller";
// import { ActionHealthIndicator } from "./action.health.indicator";
import { ActionService } from "./action.service";
import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import config from "./action.config";

@Module({
  controllers: [ActionController],
  exports: [
    ActionConfigService,
    // ActionHealthIndicator,
    ActionService
  ],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [ActionModule],
      useClass: ActionCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [
    ActionConfigService,
    //  ActionHealthIndicator,
    ActionService
  ]
})
export class ActionModule {}
