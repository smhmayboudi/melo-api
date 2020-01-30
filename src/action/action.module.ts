import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app.module";
import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import config from "./action.config";
import { ActionConfigService } from "./action.config.service";
import { ActionController } from "./action.controller";
import { ActionHealthIndicator } from "./action.health.indicator";
import { ActionService } from "./action.service";

@Module({
  controllers: [ActionController],
  exports: [ActionConfigService, ActionHealthIndicator, ActionService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [ActionModule],
      useClass: ActionCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [ActionConfigService, ActionHealthIndicator, ActionService]
})
export class ActionModule {}
