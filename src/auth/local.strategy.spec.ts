import { forwardRef } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { LocalStrategy } from "./local.strategy";

describe("LocalStrategy", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), UserModule]
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(new LocalStrategy(userService)).toBeDefined();
  });
});
