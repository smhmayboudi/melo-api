import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
