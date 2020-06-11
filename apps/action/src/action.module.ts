import { ActionController } from "./action.controller";
import { ActionEventsGateway } from "./action.events.gateway";
import { ActionService } from "./action.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ActionController],
  exports: [ActionService],
  imports: [ConfigModule.forRoot()],
  providers: [ActionEventsGateway, ActionService],
})
export class ActionModule {}
