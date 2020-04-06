/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";
import { JwksConfigService } from "./jwks.config.service";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksHealthIndicator } from "./jwks.health.indicator";
import { JwksService } from "./jwks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./jwks.config";

@Module({
  exports: [JwksConfigService, JwksHealthIndicator, JwksService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [JwksModule],
      useClass: JwksCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([JwksEntityRepository]),
  ],
  providers: [JwksConfigService, JwksHealthIndicator, JwksService],
})
export class JwksModule {}
