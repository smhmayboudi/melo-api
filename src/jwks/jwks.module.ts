import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";
import config from "./jwks.config";
import { JwksConfigService } from "./jwks.config.service";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksHealthIndicator } from "./jwks.health";
import { JwksService } from "./jwks.service";

@Module({
  controllers: [],
  exports: [JwksConfigService, JwksHealthIndicator, JwksService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [JwksModule],
      useClass: JwksCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([JwksEntityRepository])
  ],
  providers: [JwksConfigService, JwksHealthIndicator, JwksService]
})
export class JwksModule {}
