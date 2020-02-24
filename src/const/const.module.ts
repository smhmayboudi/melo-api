import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app/app.module";
import { PromModule } from "../prom/prom.module";
import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import config from "./const.config";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstHealthIndicator } from "./const.health.indicator";
import { ConstService } from "./const.service";

@Module({
  controllers: [ConstController],
  exports: [ConstConfigService, ConstHealthIndicator, ConstService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [ConstModule],
      useClass: ConstCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    PromModule.forCounter({
      help: "counter",
      labelNames: ["function", "module", "service"],
      name: "const"
    })
  ],
  providers: [ConstConfigService, ConstHealthIndicator, ConstService]
})
export class ConstModule {}
