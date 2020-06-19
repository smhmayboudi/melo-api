import { ActionConfigService } from "./action.config.service";
import { ActionController } from "./action.controller";
import { ActionEventsGateway } from "./action.events.gateway";
import { ActionService } from "./action.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import config from "./action.config";

@Module({
  controllers: [ActionConfigService, ActionController],
  exports: [ActionService],
  imports: [ConfigModule.forFeature(config), ConfigModule.forRoot()],
  providers: [ActionConfigService, ActionEventsGateway, ActionService],
})
export class ActionModule {}
