import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [
    ConfigModule.forFeature(config),
    TypeOrmModule.forRoot({
      type: "mariadb",
      logging: "all",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "testpassword",
      database: "meloapp",
      entities: [User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [UserConfigService, UserService]
})
export class UserModule {}
