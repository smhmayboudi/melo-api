import { Test, TestingModule } from "@nestjs/testing";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserServiceInterface } from "./user.service.interface";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";

describe("UserController", () => {
  const user: UserUserResDto = {
    id: 0,
    telegram_id: 0
  };

  const userServiceMock: UserServiceInterface = {
    find: (): Promise<UserUserResDto[]> => Promise.resolve([user]),
    findOneById: (): Promise<UserUserResDto | undefined> =>
      Promise.resolve(user),
    findOneByTelegramId: (): Promise<UserUserResDto | undefined> =>
      Promise.resolve(user),
    findOneByUsernam: (): Promise<UserUserResDto | undefined> =>
      Promise.resolve(user),
    get: (): Promise<UserUserResDto | undefined> => Promise.resolve(user),
    put: (): Promise<UserUserResDto> => Promise.resolve(user),
    save: (): Promise<UserUserResDto> => Promise.resolve(user)
  };

  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("fins hould return an array of users", async () => {
    expect(await controller.find()).toEqual([user]);
  });

  it("get hould return a users", async () => {
    expect(await controller.get(0)).toEqual(user);
  });

  it("put hould return a users", async () => {
    const dto: UserEditReqDto = {};
    expect(await controller.edit(dto, 0)).toEqual(user);
  });
});
