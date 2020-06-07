import {
  AuthAccessTokenReqDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  JWKS_SERVICE,
  RT_SERVICE,
  RtResDto,
} from "@melo/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

jest.mock("crypto-random-string", () => jest.fn(() => "1"));

describe("AuthService", () => {
  const rt: RtResDto = {
    created_at: new Date(100001),
    description: "",
    expire_at: new Date(900009),
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0,
  };

  // TODO: interface ?
  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtRefreshTokenExpiresIn: 0,
  };
  // TODO: interface ?
  const jwksClientProxyMock = {
    send: () =>
      of({
        id: "",
        private_key: "",
        public_key: "",
      }),
  };
  // TODO: interface ?
  const jwtServiceMock = {
    sign: (): string => "0",
  };
  // TODO: interface ?
  const rtClientProxyMock = {
    send: () => of(rt),
  };

  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JWKS_SERVICE, useValue: jwksClientProxyMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RT_SERVICE, useValue: rtClientProxyMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
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

  it("accessToken should be equal to a token 2", async () => {
    // TODO: interface ?
    const jwksClientProxyMock = {
      send: () => of(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JWKS_SERVICE, useValue: jwksClientProxyMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RT_SERVICE, useValue: rtClientProxyMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);

    const dto: AuthAccessTokenReqDto = {
      sub: 1,
    };
    return expect(service.accessToken(dto)).rejects.toThrowError();
  });

  it("deleteByToken should be equal to a token", async () => {
    const dto: AuthDeleteByTokenReqDto = {
      token: "",
    };
    expect(await service.deleteByToken(dto)).toEqual(rt);
  });

  it("refreshToken should be equal to a token", async () => {
    const dto: AuthRefreshTokenReqDto = {
      rt: "0",
      sub: 1,
    };
    expect(await service.refreshToken(dto)).toEqual({
      at: "0",
      rt: "0",
    });
  });

  it("refreshToken should be equal to a token 2", async () => {
    const dto: AuthRefreshTokenReqDto = {
      rt: "",
      sub: 1,
    };
    expect(await service.refreshToken(dto)).toEqual({
      at: "0",
      rt: "1",
    });
  });

  it("refreshToken should throw an error", async () => {
    // TODO: interface ?
    const jwksClientProxyMock = {
      send: () => of(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JWKS_SERVICE, useValue: jwksClientProxyMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RT_SERVICE, useValue: rtClientProxyMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);

    const dto: AuthRefreshTokenReqDto = {
      sub: 1,
    };
    return expect(service.refreshToken(dto)).rejects.toThrowError();
  });
});
