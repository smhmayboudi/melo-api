import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { RtService } from "../rt/rt.service";
import config from "./auth.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";
import { RtServiceInterface } from "src/rt/rt.service.interface";
import { RtEntity } from "../rt/rt.entity";

describe("AuthController", () => {
  const date = new Date();
  const rtEntity: RtEntity = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    user_id: 0,
    token: ""
  };

  const authServiceMock: AuthServiceInterface = {
    accessToken: (): Promise<AuthAccessTokenResDto | undefined> =>
      Promise.resolve({
        at: ""
      }),
    refreshToken: (): Promise<AuthRefreshTokenResDto | undefined> =>
      Promise.resolve({
        at: "",
        rt: ""
      })
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
    save: (): Promise<RtEntity[]> => Promise.resolve([rtEntity]),
    validateBySub: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    validateByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity)
  };

  let authService: AuthService;
  let controller: AuthController;
  let rtService: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: RtService, useValue: rtServiceMock }
      ]
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    rtService = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("login should be defined", async () => {
    const res = {
      at: "",
      rt: ""
    };
    jest
      .spyOn(authService, "refreshToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.login(0)).toBe(res);
  });

  it("logout should be defined", async () => {
    jest
      .spyOn(rtService, "deleteByToken")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await controller.logout("")).toBe(undefined);
  });

  it("telegram/callback should be defined", async () => {
    const res = {
      rt: "",
      at: ""
    };
    jest
      .spyOn(authService, "refreshToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.telegram(0)).toBe(res);
  });

  it("token should be defined", async () => {
    const res = {
      at: ""
    };
    jest
      .spyOn(authService, "accessToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.token(0)).toBe(res);
  });
});
