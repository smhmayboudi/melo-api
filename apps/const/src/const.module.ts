import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ConstController],
  providers: [ConstService],
})
export class ConstModule {}
