import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import config from "./at.config";
import { AtConfigService } from "./at.config.service";
import { AtEntityRepository } from "./at.entity.repository";
import { AtService } from "./at.service";
import { AppModule } from "../app.module";

@Module({
  controllers: [],
  exports: [AtConfigService, AtService],
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
  providers: [AtConfigService, AtService]
})
export class AtModule {}
