import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AT_SERVICE } from "@melo/common";
import { AppModule } from "../app/app.module";
// import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import { AtConfigService } from "./at.config.service";
import { AtHealthIndicator } from "./at.health.indicator";
import { AtService } from "./at.service";
import { ConfigModule } from "@nestjs/config";
import config from "./at.config";

@Module({
  exports: [AtConfigService, AtHealthIndicator, AtService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [AtModule],
    //   useClass: AtCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: AT_SERVICE,
        options: {
          url: process.env.AT_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [AtConfigService, AtHealthIndicator, AtService],
})
export class AtModule {}
