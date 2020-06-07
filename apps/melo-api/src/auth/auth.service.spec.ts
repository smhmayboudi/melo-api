import {
  AUTH_SERVICE,
  AUTH_SERVICE_LOGOUT,
  AUTH_SERVICE_TOKEN,
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@melo/common";

import { AuthService } from "./auth.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

jest.mock("crypto-random-string", () => jest.fn(() => "1"));

describe("AuthService", () => {
  const date = new Date();
  const accessToken: AuthAccessTokenResDto = {
    at: "0",
  };
  const refrshToken: AuthRefreshTokenResDto = {
    at: "0",
    rt: "0",
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

  // TODO: interface ?
  const authClientProxyMock = {
    send: (token: string) =>
      token === AUTH_SERVICE_LOGOUT
        ? of(rt)
        : token === AUTH_SERVICE_TOKEN
        ? of(accessToken)
        : of(refrshToken),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AUTH_SERVICE, useValue: authClientProxyMock },
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
});
