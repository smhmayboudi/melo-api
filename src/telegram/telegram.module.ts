import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TelegramCacheOptionsFactory } from "./telegram.cache.options.factory";
import config from "./telegram.config";
import { TelegramConfigService } from "./telegram.config.service";
import { TelegramController } from "./telegram.controller";
import { TelegramService } from "./telegram.service";
import { AppModule } from "../app.module";

@Module({
  controllers: [TelegramController],
  exports: [TelegramConfigService, TelegramService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [TelegramModule],
      useClass: TelegramCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [TelegramConfigService, TelegramService]
})
export class TelegramModule {}