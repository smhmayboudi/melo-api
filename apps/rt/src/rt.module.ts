import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RtConfigService } from "./rt.config.service";
import { RtController } from "./rt.controller";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtEventsGateway } from "./rt.events.gateway";
import { RtService } from "./rt.service";
import { RtTypeOrmOptionsFactory } from "./rt.type-orm.options.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./rt.config";

@Module({
  controllers: [RtController],
  exports: [RtConfigService, RtService],
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([RtEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RtModule],
      useClass: RtTypeOrmOptionsFactory,
    }),
  ],
  providers: [RtConfigService, RtEventsGateway, RtService],
})
export class RtModule {}
