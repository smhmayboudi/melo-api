import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserEntityRepository } from "./user.entity.repository";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        TypeOrmModule.forFeature([UserEntityRepository])
      ],
      providers: [UserConfigService, UserService]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("findOneById");
  test.todo("findOneByTelegramId");
  test.todo("findOneByUsernam");
  test.todo("edit");
  test.todo("get");
});
