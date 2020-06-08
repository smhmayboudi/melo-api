import { ConfigModule } from "@nestjs/config";
import { JwksConfigService } from "./jwks.config.service";
import { JwksController } from "./jwks.controller";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";
import { JwksTypeOrmOptionsFactory } from "./jwks.type-orm.options.factory";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./jwks.config";

@Module({
  controllers: [JwksController],
  exports: [JwksConfigService, JwksService],
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([JwksEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [JwksModule],
      useClass: JwksTypeOrmOptionsFactory,
    }),
  ],
  providers: [JwksConfigService, JwksService],
})
export class JwksModule {}
