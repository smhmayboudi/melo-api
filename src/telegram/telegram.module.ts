import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app.module";
import { TelegramCacheOptionsFactory } from "./telegram.cache.options.factory";
import config from "./telegram.config";
import { TelegramConfigService } from "./telegram.config.service";
import { TelegramController } from "./telegram.controller";
import { TelegramHealthIndicator } from "./telegram.health";
import { TelegramService } from "./telegram.service";

@Module({
  controllers: [TelegramController],
  exports: [TelegramConfigService, TelegramHealthIndicator, TelegramService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [TelegramModule],
      useClass: TelegramCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [TelegramConfigService, TelegramHealthIndicator, TelegramService]
})
export class TelegramModule {}
