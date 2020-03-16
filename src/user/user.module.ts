/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app/app.module";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserHealthIndicator } from "./user.health.indicator";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserHealthIndicator, UserService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [UserModule],
      useClass: UserCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([UserEntityRepository])
  ],
  providers: [UserConfigService, UserHealthIndicator, UserService]
})
export class UserModule {}
