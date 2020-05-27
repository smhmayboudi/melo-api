import {
  AuthAccessTokenReqDto,
  AuthConfigReqDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  JwksResDto,
  RtResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthService } from "./auth.service";
import { JwksEntity } from "../jwks/jwks.entity";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { JwtService } from "@nestjs/jwt";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";

describe("AuthService", () => {
  const config: AuthConfigReqDto = {
    expiresIn: 0,
  };
  const date = new Date();
  const jwksEntity: JwksEntity = {
    id: "",
    private_key: "",
    public_key: "",
  };
  const rt: RtResDto = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0,
  };

  let service: AuthService;

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOne: (): Promise<JwksResDto | undefined> => Promise.resolve(jwksEntity),
    getOneRandom: (): Promise<JwksResDto | undefined> =>
      Promise.resolve(jwksEntity),
  };
  // TODO: interface ?
  const jwtServiceMock = {
    sign: (): string => "0",
  };
  const rtServiceMock: RtServiceInterface = {
    block: (): Promise<RtResDto> => Promise.resolve(rt),
    blockByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    delete: (): Promise<RtResDto> => Promise.resolve(rt),
    deleteByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    find: (): Promise<RtResDto[]> => Promise.resolve([rt]),
    findOne: (): Promise<RtResDto> => Promise.resolve(rt),
    findOneByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    save: (): Promise<RtResDto> => Promise.resolve(rt),
    validate: (): Promise<RtResDto> => Promise.resolve(rt),
    validateByToken: (): Promise<RtResDto> => Promise.resolve(rt),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    jest.mock("crypto-random-string").fn(() => "");
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("accessToken should be equal to a token", async () => {
    const dto: AuthAccessTokenReqDto = {
      sub: 1,
    };
    expect(await service.accessToken(dto)).toEqual({
      at: "0",
    });
  });

  it("deleteByToken should be equal to a token", async () => {
    const dto: AuthDeleteByTokenReqDto = {
      token: "",
    };
    expect(await service.deleteByToken(dto)).toEqual(rt);
  });

  it("refreshToken should be equal to a token", async () => {
    const dto: AuthRefreshTokenReqDto = {
      config,
      sub: 1,
    };
    expect(await service.refreshToken(dto)).toEqual({
      at: "0",
      rt: undefined,
    });
  });
});
