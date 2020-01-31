import { CacheModule, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserModule } from "./user.module";
import { UserService } from "./user.service";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        CacheModule.registerAsync({
          imports: [UserModule],
          useClass: UserCacheOptionsFactory
        }),
        ConfigModule.forFeature(config),
        TypeOrmModule.forFeature([UserEntityRepository])
      ],
      controllers: [UserController],
      providers: [UserConfigService, UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("edit");
  test.todo("get");
});
