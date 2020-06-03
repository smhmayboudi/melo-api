import { JwksController } from "./jwks.controller";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";
import { JwksTypeOrmOptionsFactory } from "./jwks.type-orm.options.factory";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [JwksController],
  imports: [
    TypeOrmModule.forFeature([JwksEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [JwksModule],
      useClass: JwksTypeOrmOptionsFactory,
    }),
  ],
  providers: [JwksService],
})
export class JwksModule {}
