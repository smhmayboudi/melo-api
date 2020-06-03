import { AtController } from "./at.controller";
import { AtEntityRepository } from "./at.entity.repository";
import { AtService } from "./at.service";
import { AtTypeOrmOptionsFactory } from "./at.type-orm.options.factory";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [AtController],
  imports: [
    TypeOrmModule.forFeature([AtEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AtModule],
      useClass: AtTypeOrmOptionsFactory,
    }),
  ],
  providers: [AtService],
})
export class AtModule {}
