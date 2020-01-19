import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./jwks.config";
import { JwksConfigService } from "./jwks.config.service";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";
import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";

@Module({
  controllers: [],
  exports: [JwksConfigService, JwksService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [JwksModule],
      useClass: JwksCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([JwksEntityRepository])
  ],
  providers: [JwksConfigService, JwksService]
})
export class JwksModule {}
