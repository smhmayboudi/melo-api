import { ConfigModule } from "@nestjs/config";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { Module } from "@nestjs/common";
import config from "./const.config";

@Module({
  controllers: [ConstController],
  imports: [ConfigModule.forFeature(config)],
  providers: [ConstConfigService, ConstService],
})
export class ConstModule {}
