import { Test, TestingModule } from "@nestjs/testing";
import { UserEditReqDto, UserResDto } from "@melo/common";

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

  it("find should return an array of users", async () => {
    expect(await controller.find()).toEqual([user]);
  });

  it("get should return a users", async () => {
    expect(await controller.get(0)).toEqual(user);
  });

  it("edit should return a users", async () => {
    const dto: UserEditReqDto = {
      sub: 0,
    };
    expect(await controller.edit(dto, 0)).toEqual(user);
  });
});
