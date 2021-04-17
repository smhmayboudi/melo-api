import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { USER_SERVICE } from "@melo/common";
// import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserHealthIndicator } from "./user.health.indicator";
import { UserService } from "./user.service";
import config from "./user.config";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserHealthIndicator, UserService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [UserModule],
    //   useClass: UserCacheOptionsFactory,
    // }),
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
  ],
  providers: [UserConfigService, UserHealthIndicator, UserService],
})
export class UserModule {}
