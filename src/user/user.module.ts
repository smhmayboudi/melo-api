import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthCacheOptionsFactory } from "./user.cache.options.factory";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [UserModule],
      useClass: AuthCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([UserEntityRepository])
  ],
  providers: [UserConfigService, UserService]
})
export class UserModule {}
