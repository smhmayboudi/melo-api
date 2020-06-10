import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { JwksResDto } from "@melo/common";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { Test } from "@nestjs/testing";

describe("AuthJwtOptionsFactory", () => {
  const jwks: JwksResDto = {
    id: "",
    private_key: "",
    public_key: "",
  };

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOne: () => Promise.resolve(jwks),
    getOneRandom: () => Promise.resolve(jwks),
  };

  let authConfigService: AuthConfigService;
  let jwksService: JwksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
      ],
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect(
      new AuthJwtOptionsFactory(authConfigService, jwksService)
    ).toBeDefined();
  });

  it("createJwtOptions should be equal to an option", async () => {
    expect(
      await new AuthJwtOptionsFactory(
        authConfigService,
        jwksService
      ).createJwtOptions()
    ).toEqual({
      privateKey: "",
      publicKey: "",
      signOptions: {
        algorithm: "RS256",
        expiresIn: 0,
      },
    });
  });

  it("createJwtOptions should be equal to an option with jwks undefined", async () => {
    const jwksServiceMockGetOneRandom: JwksServiceInterface = {
      ...jwksServiceMock,
      getOneRandom: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        {
          provide: JwksService,
          useValue: jwksServiceMockGetOneRandom,
        },
      ],
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);

    expect(
      await new AuthJwtOptionsFactory(
        authConfigService,
        jwksService
      ).createJwtOptions()
    ).toEqual({});
  });
});
