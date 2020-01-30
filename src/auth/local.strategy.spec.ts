import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntityRepository } from "../jwks/jwks.entity.repository";
import { JwksService } from "../jwks/jwks.service";
import { UserService } from "../user/user.service";
import { AuthConfigService } from "./auth.config.service";
import { LocalStrategy } from "./local.strategy";

describe("LocalStrategy", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthConfigService,
        ConfigService,
        JwksEntityRepository,
        JwksService
      ]
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(new LocalStrategy(userService)).toBeDefined();
  });
});
