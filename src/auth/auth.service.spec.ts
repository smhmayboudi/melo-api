import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntity } from "../jwks/jwks.entity";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { RtService } from "../rt/rt.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "",
    telegramQueryExpiration: 0
  };
  const jwksEntity = {
    id: "",
    public_key: "",
    private_key: ""
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOneById: (): Promise<JwksEntity | undefined> =>
      Promise.resolve(jwksEntity),
    getOneRandom: (): Promise<JwksEntity | undefined> =>
      Promise.resolve(jwksEntity)
  };
  // TODO: interface ?
  const jwtServiceMock = {
    sign: (): any => 0
  };
  // TODO: interface ?
  const rtServiceMock = {
    save: (): any => [
      {
        created_at: new Date(),
        description: "",
        expire_at: new Date(),
        id: 0,
        is_blocked: false,
        user_id: 0,
        token: ""
      }
    ]
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RtService, useValue: rtServiceMock }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("accessToken should be defined", async () => {
    const res = {
      at: 0
    };
    expect(await service.accessToken(0)).toEqual(res);
  });

  it("refreshToken should be defined", async () => {
    jest.mock("crypto-random-string").fn(() => "");
    const res = {
      at: 0,
      rt: ""
    };
    expect(await service.refreshToken(0)).toEqual(res);
  });
});
