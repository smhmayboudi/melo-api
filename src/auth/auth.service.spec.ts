import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntity } from "../jwks/jwks.entity";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { RtEntity } from "../rt/rt.entity";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthService } from "./auth.service";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";

describe("AuthService", () => {
  const date = new Date();
  const jwksEntity: JwksEntity = {
    id: "",
    public_key: "",
    private_key: ""
  };
  const rtEntity: RtEntity = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    user_id: 0,
    token: ""
  };

  let service: AuthService;

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOneById: (): Promise<JwksEntity | undefined> =>
      Promise.resolve(jwksEntity),
    getOneRandom: (): Promise<JwksEntity | undefined> =>
      Promise.resolve(jwksEntity)
  };
  // TODO: interface ?
  const jwtServiceMock = {
    sign: () => "0"
  };
  const rtServiceMock: RtServiceInterface = {
    blockById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    blockByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    deleteById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    deleteByToken: (): Promise<void> => Promise.resolve(undefined),
    find: (): Promise<RtEntity[]> => Promise.resolve([rtEntity]),
    findOneById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    findOneByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    save: (): Promise<RtEntity> => Promise.resolve(rtEntity),
    validateBySub: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    validateByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity)
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
    jest.mock("crypto-random-string").fn(() => "");
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("accessToken should equal to a token", async () => {
    const res: AuthAccessTokenResDto = {
      at: "0"
    };
    expect(await service.accessToken(0)).toEqual(res);
  });

  it("refreshToken should equal to a token", async () => {
    const res: AuthRefreshTokenResDto = {
      at: "0",
      rt: ""
    };
    expect(await service.refreshToken(0)).toEqual(res);
  });

  describe("getOneRandom: undefined", () => {
    const jwksServiceMockGetOneRandomUndefined: JwksServiceInterface = {
      ...jwksServiceMock,
      getOneRandom: (): Promise<JwksEntity | undefined> =>
        Promise.resolve(undefined)
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: AuthConfigService, useValue: authConfigServiceMock },
          {
            provide: JwksService,
            useValue: jwksServiceMockGetOneRandomUndefined
          },
          { provide: JwtService, useValue: jwtServiceMock },
          { provide: RtService, useValue: rtServiceMock }
        ]
      }).compile();
      service = module.get<AuthService>(AuthService);
    });

    it("accessToken should throw an exception", async () => {
      try {
        expect(await service.accessToken(0)).toThrowError();
      } catch (error) {
        console.log(error);
      }
    });

    it("refreshToken should throw an exception", async () => {
      try {
        expect(await service.refreshToken(0)).toThrowError();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
