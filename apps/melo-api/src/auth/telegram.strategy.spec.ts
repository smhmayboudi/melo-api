import { AuthTelegramPayloadReqDto, UserResDto } from "@melo/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { TelegramStrategy } from "./telegram.strategy";
import { Test } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";

describe("TelegramStrategy", () => {
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
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

  let authConfigService: AuthConfigService;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(new TelegramStrategy(authConfigService, userService)).toBeDefined();
  });

  it("validate should be equal to an auth strategy", async () => {
    const dto: AuthTelegramPayloadReqDto = {
      auth_date: 0,
      first_name: "",
      hash: "",
      id: 0,
      last_name: "",
      photo_url: "",
      username: "",
    };
    expect(
      await new TelegramStrategy(authConfigService, userService).validate(dto)
    ).toEqual({
      sub: "0",
    });
  });

  it("validate should be equal to a token", async () => {
    const userServiceMockFindOneByTelegramId: UserServiceInterface = {
      ...userServiceMock,
      findOneByTelegramId: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        {
          provide: UserService,
          useValue: userServiceMockFindOneByTelegramId,
        },
      ],
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    userService = module.get<UserService>(UserService);

    const dto: AuthTelegramPayloadReqDto = {
      auth_date: 0,
      first_name: "",
      hash: "",
      id: 0,
      last_name: "",
      photo_url: "",
      username: "",
    };
    expect(
      await new TelegramStrategy(authConfigService, userService).validate(dto)
    ).toEqual({
      sub: "0",
    });
  });
});
