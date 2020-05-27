import { JwksController } from "./jwks.controller";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [JwksController],
  imports: [TypeOrmModule.forFeature([JwksEntityRepository])],
  providers: [JwksService],
})
export class JwksModule {}
