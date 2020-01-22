import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserService } from "./user.service";
import { UserHealthIndicator } from "./user.health";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserHealthIndicator, UserService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [UserModule],
      useClass: UserCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([UserEntityRepository])
  ],
  providers: [UserConfigService, UserHealthIndicator, UserService]
})
export class UserModule {}
