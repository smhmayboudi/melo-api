import { LocalStrategy } from "./local.strategy";
import { Test } from "@nestjs/testing";
import { UserResDto } from "@melo/common";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";

describe("LocalStrategy", () => {
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

  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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

  it("validate should throw an error", async () => {
    const userServiceMockFindOneByUsernam: UserServiceInterface = {
      ...userServiceMock,
      findOneByUsername: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userServiceMockFindOneByUsernam,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);

    return expect(
      new LocalStrategy(service).validate("", "")
    ).rejects.toThrowError();
  });
});
