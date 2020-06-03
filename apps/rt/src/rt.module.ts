import { Module } from "@nestjs/common";
import { RtController } from "./rt.controller";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtService } from "./rt.service";
import { RtTypeOrmOptionsFactory } from "./rt.type-orm.options.factory";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [RtController],
  imports: [
    TypeOrmModule.forFeature([RtEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RtModule],
      useClass: RtTypeOrmOptionsFactory,
    }),
  ],
  providers: [RtService],
})
export class RtModule {}
