import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { Test } from "@nestjs/testing";

describe("AuthJwtOptionsFactory", () => {
  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };

  let authConfigService: AuthConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
      ],
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
  });

  it("should be defined", () => {
    expect(new AuthJwtOptionsFactory(authConfigService)).toBeDefined();
  });

  it("createJwtOptions should be equal to an option", async () => {
    expect(
      await new AuthJwtOptionsFactory(authConfigService).createJwtOptions()
    ).toEqual({
      privateKey: "",
      publicKey: "",
      signOptions: {
        algorithm: "RS256",
        expiresIn: 0,
      },
    });
  });
});
