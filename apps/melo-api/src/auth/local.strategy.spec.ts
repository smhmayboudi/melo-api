import { Test, TestingModule } from "@nestjs/testing";

import { LocalStrategy } from "./local.strategy";
import { UserResDto } from "@melo/common";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";

describe("LocalStrategy", () => {
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

  it("validate should throw an error", async () => {
    const userServiceMockFindOneByUsernam: UserServiceInterface = {
      ...userServiceMock,
      findOneByUsername: (): Promise<UserResDto | undefined> =>
        Promise.resolve(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
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
