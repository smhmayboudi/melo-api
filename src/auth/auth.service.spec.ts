import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { RtService } from "../rt/rt.service";
import { JwksService } from "../jwks/jwks.service";
import { UserService } from "../user/user.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthService } from "./auth.service";
import { JwksEntityRepository } from "src/jwks/jwks.entity.repository";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthConfigService,
        AuthService,
        ConfigService,
        JwksEntityRepository,
        JwksService,
        JwtService,
        RtService,
        UserService
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("accessToken");
  test.todo("refreshToken");
});
