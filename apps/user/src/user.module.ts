import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserEventsGateway } from "./user.events.gateway";
import { UserService } from "./user.service";
import { UserTypeOrmOptionsFactory } from "./user.type-orm.options.factory";
import config from "./user.config";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserService],
  imports: [
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [UserModule],
      useClass: UserTypeOrmOptionsFactory,
    }),
  ],
  providers: [UserConfigService, UserEventsGateway, UserService],
})
export class UserModule {}
