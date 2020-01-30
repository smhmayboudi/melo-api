import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntityRepository } from "../jwks/jwks.entity.repository";
import { JwksService } from "../jwks/jwks.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";

describe("AuthJwtOptionsFactory", () => {
  let authConfigService: AuthConfigService;
  let jwksService: JwksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthConfigService,
        ConfigService,
        JwksEntityRepository,
        JwksService
      ]
    }).compile();

    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect(
      new AuthJwtOptionsFactory(authConfigService, jwksService)
    ).toBeDefined();
  });
});
