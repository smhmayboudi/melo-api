import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_SERVICE } from "@melo/common";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserHealthIndicator } from "./user.health.indicator";
import { UserService } from "./user.service";
import config from "./user.config";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserHealthIndicator, UserService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [UserModule],
      useClass: UserCacheOptionsFactory,
    }),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        options: {
          url: process.env.USER_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([UserEntityRepository]),
  ],
  providers: [UserConfigService, UserHealthIndicator, UserService],
})
export class UserModule {}