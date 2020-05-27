import { AtController } from "./at.controller";
import { AtEntityRepository } from "./at.entity.repository";
import { AtService } from "./at.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [AtController],
  imports: [TypeOrmModule.forFeature([AtEntityRepository])],
  providers: [AtService],
})
export class AtModule {}
