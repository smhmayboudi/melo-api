import { CommonService } from "./common.service";
import { Module } from "@nestjs/common";

@Module({
  exports: [CommonService],
  providers: [CommonService],
})
export class CommonModule {}
