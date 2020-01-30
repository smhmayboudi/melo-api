import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserService } from "./user.service";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserEntityRepository, UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("edit");
  test.todo("get");
});
