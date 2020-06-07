import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { RtResDto } from "@melo/common";
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

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
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
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("login should be equal to a token", async () => {
    expect(await controller.login(0)).toEqual({
      at: "",
      rt: "",
    });
  });

  it("logout should be equal to a rt", async () => {
    expect(await controller.logout("")).toEqual(rt);
  });

  it("telegramCallback should be equal to a token", async () => {
    expect(await controller.telegram(0)).toEqual({
      at: "",
      rt: "",
    });
  });

  it("token should be equal to a token", async () => {
    expect(await controller.token(0)).toEqual({
      at: "",
    });
  });
});
