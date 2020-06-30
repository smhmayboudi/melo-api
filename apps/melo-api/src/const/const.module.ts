import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { CONST_SERVICE } from "@melo/common";
import { ConfigModule } from "@nestjs/config";
// import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstHealthIndicator } from "./const.health.indicator";
import { ConstService } from "./const.service";
import config from "./const.config";

@Module({
  controllers: [ConstController],
  exports: [ConstConfigService, ConstHealthIndicator, ConstService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [ConstModule],
    //   useClass: ConstCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: CONST_SERVICE,
        options: {
          url: process.env.CONST_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [ConstConfigService, ConstHealthIndicator, ConstService],
})
export class ConstModule {}
