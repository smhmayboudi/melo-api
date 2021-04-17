import { ConfigModule } from "@nestjs/config";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstEventsGateway } from "./const.events.gateway";
import { ConstService } from "./const.service";
import { Module } from "@nestjs/common";
import config from "./const.config";

@Module({
  controllers: [ConstController],
  exports: [ConstConfigService, ConstService],
  imports: [ConfigModule.forFeature(config), ConfigModule.forRoot()],
  providers: [ConstConfigService, ConstEventsGateway, ConstService],
})
export class ConstModule {}
