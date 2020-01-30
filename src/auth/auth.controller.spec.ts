import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksService } from "../jwks/jwks.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthConfigService, AuthService, ConfigService, JwksService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("test");
  test.todo("login");
  test.todo("logout");
  test.todo("telegram");
  test.todo("token");
});
