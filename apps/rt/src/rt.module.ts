import { Module } from "@nestjs/common";
import { RtController } from "./rt.controller";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtService } from "./rt.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [RtController],
  imports: [TypeOrmModule.forFeature([RtEntityRepository])],
  providers: [RtService],
})
export class RtModule {}
