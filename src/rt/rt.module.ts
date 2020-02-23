import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app/app.module";
// import { PromModule } from "../prom/prom.module";
import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import config from "./rt.config";
import { RtConfigService } from "./rt.config.service";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtHealthIndicator } from "./rt.health.indicator";
import { RtService } from "./rt.service";

@Module({
  controllers: [],
  exports: [RtConfigService, RtHealthIndicator, RtService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RtModule],
      useClass: RtCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    // PromModule.register({
    //   name: "rt counter",
    //   labelNames: ["function", "module", "service"],
    //   name: "rt"
    // })
    TypeOrmModule.forFeature([RtEntityRepository])
  ],
  providers: [RtConfigService, RtHealthIndicator, RtService]
})
export class RtModule {}
