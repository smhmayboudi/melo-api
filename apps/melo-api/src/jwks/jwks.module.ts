import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { JWKS_SERVICE } from "@melo/common";
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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [JwksModule],
      useClass: JwksCacheOptionsFactory,
    }),
    ClientsModule.register([
      {
        name: JWKS_SERVICE,
        options: {
          url: process.env.JWKS_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([JwksEntityRepository]),
  ],
  providers: [JwksConfigService, JwksHealthIndicator, JwksService],
})
export class JwksModule {}
