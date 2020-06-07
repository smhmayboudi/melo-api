import { AppConfigService } from "../app/app.config.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

describe("AuthConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    telegramBotToken: "",
    telegramQueryExpiration: 0,
  };
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: AuthConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthConfigService,
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("jwtAccessTokenExpiresCount should be equal to a value", () => {
    expect(service.jwtAccessTokenExpiresCount).toEqual(0);
  });

  it("jwtAccessTokenExpiresIn should be equal to a value", () => {
    expect(service.jwtAccessTokenExpiresIn).toEqual(0);
  });

  it("jwtAuhSchema cacheHost should be equal to a value", () => {
    expect(service.jwtAuhSchema).toEqual("");
  });

  it("telegramBotToken should be equal to a value", () => {
    expect(service.telegramBotToken).toEqual("");
  });

  it("telegramQueryExpiration should be equal to a value", () => {
    expect(service.telegramQueryExpiration).toEqual(0);
  });
});
