import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { RT_SERVICE } from "@melo/common";
// import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import { RtConfigService } from "./rt.config.service";
import { RtHealthIndicator } from "./rt.health.indicator";
import { RtService } from "./rt.service";
import config from "./rt.config";

@Module({
  exports: [RtConfigService, RtHealthIndicator, RtService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [RtModule],
    //   useClass: RtCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: RT_SERVICE,
        options: {
          url: process.env.RT_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [RtConfigService, RtHealthIndicator, RtService],
})
export class RtModule {}
