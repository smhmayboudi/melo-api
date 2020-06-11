import { AtConfigService } from "./at.config.service";
import { AtController } from "./at.controller";
import { AtEntityRepository } from "./at.entity.repository";
import { AtEventsGateway } from "./at.events.gateway";
import { AtService } from "./at.service";
import { AtTypeOrmOptionsFactory } from "./at.type-orm.options.factory";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./at.config";

@Module({
  controllers: [AtController],
  exports: [AtConfigService, AtService],
  imports: [
    TypeOrmModule.forFeature([AtEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AtModule],
      useClass: AtTypeOrmOptionsFactory,
    }),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
  ],
  providers: [AtConfigService, AtEventsGateway, AtService],
})
export class AtModule {}
