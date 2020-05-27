import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import { RtConfigService } from "./rt.config.service";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtHealthIndicator } from "./rt.health.indicator";
import { RtService } from "./rt.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./rt.config";

@Module({
  exports: [RtConfigService, RtHealthIndicator, RtService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RtModule],
      useClass: RtCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([RtEntityRepository]),
  ],
  providers: [RtConfigService, RtHealthIndicator, RtService],
})
export class RtModule {}
