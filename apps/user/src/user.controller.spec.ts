import { Test, TestingModule } from "@nestjs/testing";
import {
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@melo/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserServiceInterface } from "./user.service.interface";

describe("UserController", () => {
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };

  const userServiceMock: UserServiceInterface = {
    edit: (): Promise<UserResDto> => Promise.resolve(user),
    find: (): Promise<UserResDto[]> => Promise.resolve([user]),
    findOne: (): Promise<UserResDto> => Promise.resolve(user),
    findOneByTelegramId: (): Promise<UserResDto> => Promise.resolve(user),
    findOneByUsername: (): Promise<UserResDto | undefined> =>
      Promise.resolve(user),
    get: (): Promise<UserResDto> => Promise.resolve(user),
    save: (): Promise<UserResDto> => Promise.resolve(user),
  };

  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("find should be equal to an array of users", async () => {
    expect(await controller.find()).toEqual([user]);
  });

  it("findOne should be equal to a users", async () => {
    const dto: UserFindOneReqDto = {
      id: 0,
    };
    expect(await controller.findOne(dto)).toEqual(user);
  });

  it("findOneByTelegramId should be equal to a users", async () => {
    const dto: UserFindOneByTelegramIdReqDto = {
      telegramId: 0,
    };
    expect(await controller.findOneByTelegramId(dto)).toEqual(user);
  });

  it("findOneByUsername should be equal to a users", async () => {
    const dto: UserFindOneByUsernameReqDto = {
      username: "",
    };
    expect(await controller.findOneByUsername(dto)).toEqual(user);
  });

  it("get should be equal to a users", async () => {
    const dto: UserGetReqDto = {
      sub: 1,
    };
    expect(await controller.get(dto)).toEqual(user);
  });

  it("edit should be equal to a users", async () => {
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await controller.edit(dto)).toEqual(user);
  });

  it("save should be equal to a users", async () => {
    const dto: UserSaveReqDto = {
      id: 0,
      telegramId: 0,
    };
    expect(await controller.save(dto)).toEqual(user);
  });
});
