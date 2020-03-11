import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { AuthConfigService } from "./auth.config.service";

describe("AuthService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0
    };

    let service: AuthConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthConfigService,
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<AuthConfigService>(AuthConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("jwtAccessTokenExpiresCount should equal to a value", () => {
      expect(service.jwtAccessTokenExpiresCount).toEqual(0);
    });

    it("jwtAccessTokenExpiresIn should equal to a value", () => {
      expect(service.jwtAccessTokenExpiresIn).toEqual("0ms");
    });

    it("jwtRefreshTokenExpiresIn should equal to a value", () => {
      expect(service.jwtRefreshTokenExpiresIn).toEqual("0ms");
    });

    it("telegramQueryExpiration should equal to a value", () => {
      expect(service.telegramQueryExpiration).toEqual("0ms");
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => ""
    };

    let service: AuthConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthConfigService,
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<AuthConfigService>(AuthConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("jwtAuhSchema jwtAuhSchema should equal to a value", () => {
      expect(service.jwtAuhSchema).toEqual("");
    });

    it("telegramBotToken should equal to a value", () => {
      expect(service.telegramBotToken).toEqual("");
    });
  });
});
