import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import config from "./rt.config";
import { RtConfigService } from "./rt.config.service";
import { RtController } from "./rt.controller";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtService } from "./rt.service";

@Module({
  controllers: [RtController],
  exports: [RtConfigService, RtService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RtModule],
      useClass: RtCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([RtEntityRepository])
  ],
  providers: [RtConfigService, RtService]
})
export class RtModule {}
