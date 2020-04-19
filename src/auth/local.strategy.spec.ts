import { Test, TestingModule } from "@nestjs/testing";

import { LocalStrategy } from "./local.strategy";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";
import { UserUserResDto } from "../user/dto/res/user.user.res.dto";

describe("LocalStrategy", () => {
  const user: UserUserResDto = {
    id: 0,
    telegram_id: 0,
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
    save: (): Promise<UserUserResDto> => Promise.resolve(user),
  };

  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(new LocalStrategy(service)).toBeDefined();
  });

  it("validate should be equal to an auth strategy", async () => {
    expect(await new LocalStrategy(service).validate("", "")).toEqual({
      sub: "0",
    });
  });

  describe("findOneByUsernam: undefined", () => {
    const userServiceMockFindOneByUsernamUndefined: UserServiceInterface = {
      ...userServiceMock,
      findOneByUsernam: (): Promise<UserUserResDto | undefined> =>
        Promise.resolve(undefined),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: UserService,
            useValue: userServiceMockFindOneByUsernamUndefined,
          },
        ],
      }).compile();
      service = module.get<UserService>(UserService);
    });

    it("validate should throw an error", () => {
      return expect(
        new LocalStrategy(service).validate("", "")
      ).rejects.toThrowError();
    });
  });
});
