import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserService } from "./user.service";
import { UserTypeOrmOptionsFactory } from "./user.type-orm.options.factory";

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntityRepository]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [UserModule],
      useClass: UserTypeOrmOptionsFactory,
    }),
  ],
  providers: [UserService],
})
export class UserModule {}
