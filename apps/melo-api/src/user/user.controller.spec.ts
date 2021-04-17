import { UserEditReqDto, UserResDto } from "@melo/common";

import { Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserServiceInterface } from "./user.service.interface";

describe("UserController", () => {
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };

  const userServiceMock: UserServiceInterface = {
    edit: () => Promise.resolve(user),
    find: () => Promise.resolve([user]),
    findOne: () => Promise.resolve(user),
    findOneByTelegramId: () => Promise.resolve(user),
    findOneByUsername: () => Promise.resolve(user),
    get: () => Promise.resolve(user),
    save: () => Promise.resolve(user),
  };

  let controller: UserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("find should return an array of users", async () => {
    expect(await controller.find()).toEqual([user]);
  });

  it("get should return a users", async () => {
    expect(await controller.get(0)).toEqual(user);
  });

  it("edit should return a users", async () => {
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await controller.edit(dto, 0)).toEqual(user);
  });
});
