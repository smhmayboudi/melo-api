import {
  AuthAccessTokenReqDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  RtResDto,
} from "@melo/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { Test } from "@nestjs/testing";

describe("AuthController", () => {
  const date = new Date();
  const rt: RtResDto = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0,
  };
  const authServiceMock: AuthServiceInterface = {
    accessToken: () =>
      Promise.resolve({
        at: "",
      }),
    deleteByToken: () => Promise.resolve(rt),
    refreshToken: () =>
      Promise.resolve({
        at: "",
        rt: "",
      }),
  };

  let controller: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("login should be equal to a token", async () => {
    const dto: AuthRefreshTokenReqDto = {
      sub: 1,
    };
    expect(await controller.login(dto)).toEqual({
      at: "",
      rt: "",
    });
  });

  it("logout should be equal to a rt", async () => {
    const dto: AuthDeleteByTokenReqDto = {
      token: "",
    };
    expect(await controller.logout(dto)).toEqual(rt);
  });

  it("telegramCallback should be equal to a token", async () => {
    const dto: AuthRefreshTokenReqDto = {
      sub: 1,
    };
    expect(await controller.telegram(dto)).toEqual({
      at: "",
      rt: "",
    });
  });

  it("token should be equal to a token", async () => {
    const dto: AuthAccessTokenReqDto = {
      sub: 1,
    };
    expect(await controller.token(dto)).toEqual({
      at: "",
    });
  });
});
