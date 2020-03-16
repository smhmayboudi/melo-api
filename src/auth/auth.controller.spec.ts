import { Test, TestingModule } from "@nestjs/testing";

import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthController } from "./auth.controller";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";
import { AuthService } from "./auth.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { RtEntity } from "../rt/rt.entity";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";

describe("AuthController", () => {
  const date = new Date();
  const rtEntity: RtEntity = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0
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

  it("login should be equal to a token", async () => {
    expect(await controller.login(0)).toEqual({
      at: "",
      rt: ""
    });
  });

  it("logout should be undefined", async () => {
    expect(await controller.logout("")).toBeUndefined();
  });

  it("telegramCallback should be equal to a token", async () => {
    expect(await controller.telegram(0)).toEqual({
      at: "",
      rt: ""
    });
  });

  it("token should be equal to a token", async () => {
    expect(await controller.token(0)).toEqual({
      at: ""
    });
  });
});
