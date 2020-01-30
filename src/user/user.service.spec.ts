import { Test, TestingModule } from "@nestjs/testing";
import { UserEntityRepository } from "./user.entity.repository";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEntityRepository, UserService]
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
