import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ActionController],
  exports: [ActionService],
  imports: [ConfigModule.forRoot()],
  providers: [ActionService],
})
export class ActionModule {}
