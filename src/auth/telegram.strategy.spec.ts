import { Test, TestingModule } from "@nestjs/testing";
import { UserUserResDto } from "../user/dto/res/user.user.res.dto";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthTelegramPayloadReqDto } from "./dto/req/auth.telegram-payload.req.dto";
import { TelegramStrategy } from "./telegram.strategy";

describe("TelegramStrategy", () => {
  const user: UserUserResDto = {
    id: 0,
    telegram_id: 0
  };

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0
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

  let authConfigService: AuthConfigService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
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
      username: ""
    };
    expect(
      await new TelegramStrategy(authConfigService, userService).validate(dto)
    ).toEqual({
      sub: "0"
    });
  });

  describe("findOneByUsernam: undefined", () => {
    const userServiceMockFindOneByUsernamUndefined: UserServiceInterface = {
      ...userServiceMock,
      findOneByTelegramId: (): Promise<UserUserResDto | undefined> =>
        Promise.resolve(undefined)
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          { provide: AuthConfigService, useValue: authConfigServiceMock },
          {
            provide: UserService,
            useValue: userServiceMockFindOneByUsernamUndefined
          }
        ]
      }).compile();
      authConfigService = module.get<AuthConfigService>(AuthConfigService);
      userService = module.get<UserService>(UserService);
    });

    it("validate should be equal to a token", async () => {
      const dto: AuthTelegramPayloadReqDto = {
        auth_date: 0,
        first_name: "",
        hash: "",
        id: 0,
        last_name: "",
        photo_url: "",
        username: ""
      };
      expect(
        await new TelegramStrategy(authConfigService, userService).validate(dto)
      ).toEqual({
        sub: "0"
      });
    });
  });
});
