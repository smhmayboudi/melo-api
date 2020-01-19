import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import config from "./const.config";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";

@Module({
  controllers: [ConstController],
  exports: [ConstConfigService, ConstService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [ConstModule],
      useClass: ConstCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [ConstConfigService, ConstService]
})
export class ConstModule {}
