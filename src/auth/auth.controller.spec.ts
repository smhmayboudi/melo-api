import { Test, TestingModule } from "@nestjs/testing";
import { RtEntity } from "../rt/rt.entity";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";

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
    save: (): Promise<RtEntity> => Promise.resolve(rtEntity),
    validateBySub: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    validateByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity)
  };

  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: RtService, useValue: rtServiceMock }
      ]
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("login should equal to a token", async () => {
    const res: AuthRefreshTokenResDto = {
      at: "",
      rt: ""
    };
    expect(await controller.login(0)).toEqual(res);
  });

  it("logout should be undefined", async () => {
    expect(await controller.logout("")).toBeUndefined();
  });

  it("telegramCallback should equal to a token", async () => {
    const res: AuthRefreshTokenResDto = {
      rt: "",
      at: ""
    };
    expect(await controller.telegram(0)).toEqual(res);
  });

  it("token should equal to a token", async () => {
    const res: AuthAccessTokenResDto = {
      at: ""
    };
    expect(await controller.token(0)).toEqual(res);
  });
});
