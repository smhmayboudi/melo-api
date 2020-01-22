import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import config from "./at.config";
import { AtConfigService } from "./at.config.service";
import { AtEntityRepository } from "./at.entity.repository";
import { AtHealthIndicator } from "./at.health";
import { AtService } from "./at.service";

@Module({
  controllers: [],
  exports: [AtConfigService, AtHealthIndicator, AtService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AtModule],
      useClass: AtCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([AtEntityRepository])
  ],
  providers: [AtConfigService, AtHealthIndicator, AtService]
})
export class AtModule {}
