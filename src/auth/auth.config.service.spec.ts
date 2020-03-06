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

    it("jwtAccessTokenExpiresCount should be defined", () => {
      expect(service.jwtAccessTokenExpiresCount).toBe(0);
    });

    it("jwtAccessTokenExpiresIn should be defined", () => {
      expect(service.jwtAccessTokenExpiresIn).toBe("0ms");
    });

    it("jwtRefreshTokenExpiresIn should be defined", () => {
      expect(service.jwtRefreshTokenExpiresIn).toBe("0ms");
    });

    it("telegramQueryExpiration should be defined", () => {
      expect(service.telegramQueryExpiration).toBe("0ms");
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

    it("jwtAuhSchema cacheHostshould be defined", () => {
      expect(service.jwtAuhSchema).toBe("");
    });

    it("telegramBotToken should be defined", () => {
      expect(service.telegramBotToken).toBe("");
    });
  });
});
