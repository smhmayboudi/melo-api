import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { RtService } from "../rt/rt.service";
import config from "./auth.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;
  let rtService: RtService;

  const authServiceMock = jest.fn(() => ({
    refreshToken: {
      at: "",
      rt: ""
    },
    accessToken: {
      at: ""
    }
  }));

  const rtServiceMock = jest.fn(() => ({
    // deleteByToken: undefined
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        // AuthConfigService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: RtService, useValue: rtServiceMock }
      ]
    }).compile();
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    rtService = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  it("login should be defined", async () => {
    const res = {
      at: "",
      rt: ""
    };
    jest
      .spyOn(authService, "refreshToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await authController.login(0)).toBe(res);
  });

  it("logout should be defined", async () => {
    jest
      .spyOn(rtService, "deleteByToken")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await authController.logout("")).toBe(undefined);
  });

  it("telegram/callback should be defined", async () => {
    const res = {
      rt: "",
      at: ""
    };
    jest
      .spyOn(authService, "refreshToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await authController.telegram(0)).toBe(res);
  });

  it("token should be defined", async () => {
    const res = {
      at: ""
    };
    jest
      .spyOn(authService, "accessToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await authController.token(0)).toBe(res);
  });
});
