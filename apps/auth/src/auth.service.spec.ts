import {
  AuthAccessTokenReqDto,
  AuthConfigReqDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  JWKS_SERVICE,
  JwksResDto,
  RT_SERVICE,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  const config: AuthConfigReqDto = {
    expiresIn: 0,
  };

  // TODO: interface ?
  const clientProxyJwksMock = {
    send: (): Observable<JwksResDto> =>
      of({ id: "", private_key: "", public_key: "" }),
  };
  // TODO: interface ?
  const clientProxyRtMock = {
    send: (): Observable<void> => of(undefined),
  };
  // TODO: interface ?
  const jwtServiceMock = {
    sign: (): string => "0",
  };

  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JWKS_SERVICE, useValue: clientProxyJwksMock },
        { provide: RT_SERVICE, useValue: clientProxyRtMock },
        { provide: JwtService, useValue: jwtServiceMock },
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

  it("accessToken should throw an error", async () => {
    // TODO: interface ?
    const clientProxyJwksMock = {
      send: (): Observable<JwksResDto | undefined> => of(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JWKS_SERVICE, useValue: clientProxyJwksMock },
        { provide: RT_SERVICE, useValue: clientProxyRtMock },
        { provide: JwtService, useValue: jwtServiceMock },
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
    expect(await service.deleteByToken(dto)).toEqual(undefined);
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

  it("refreshToken should be equal to a token 2", async () => {
    // TODO: interface ?
    const clientProxyJwksMock = {
      send: (): Observable<JwksResDto | undefined> => of(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JWKS_SERVICE, useValue: clientProxyJwksMock },
        { provide: RT_SERVICE, useValue: clientProxyRtMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    jest.mock("crypto-random-string").fn(() => "");

    const dto: AuthRefreshTokenReqDto = {
      config,
      sub: 1,
    };
    return expect(service.refreshToken(dto)).rejects.toThrowError();
  });
});
