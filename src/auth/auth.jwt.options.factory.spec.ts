import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntity } from "../jwks/jwks.entity";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";

describe("AuthJwtOptionsFactory", () => {
  const jwks: JwksEntity = {
    id: "",
    public_key: "",
    private_key: ""
  };

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOneById: (): Promise<JwksEntity | undefined> => Promise.resolve(jwks),
    getOneRandom: (): Promise<JwksEntity | undefined> => Promise.resolve(jwks)
  };

  let authConfigService: AuthConfigService;
  let jwksService: JwksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock }
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

  it("createJwtOptions should return an option", async () => {
    expect(
      await new AuthJwtOptionsFactory(
        authConfigService,
        jwksService
      ).createJwtOptions()
    ).toEqual({
      jsonWebTokenOptions: {
        algorithms: ["RS256"]
      },
      privateKey: "",
      publicKey: "",
      signOptions: {
        algorithm: "RS256",
        expiresIn: 0
      }
    });
  });

  describe("GetOneRandom Undefined", () => {
    const jwksServiceMockGetOneRandomUndefined: JwksServiceInterface = {
      ...jwksServiceMock,
      getOneRandom: (): Promise<JwksEntity | undefined> =>
        Promise.resolve(undefined)
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          { provide: AuthConfigService, useValue: authConfigServiceMock },
          {
            provide: JwksService,
            useValue: jwksServiceMockGetOneRandomUndefined
          }
        ]
      }).compile();
      authConfigService = module.get<AuthConfigService>(AuthConfigService);
      jwksService = module.get<JwksService>(JwksService);
    });

    it("createJwtOptions should return an option with jwks undefined", async () => {
      expect(
        await new AuthJwtOptionsFactory(
          authConfigService,
          jwksService
        ).createJwtOptions()
      ).toEqual({});
    });
  });
});
