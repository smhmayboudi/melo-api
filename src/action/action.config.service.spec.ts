import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { ActionConfigService } from "./action.config.service";

describe("ActionService", () => {
  describe("ActionService get: number", () => {
    const appConfigServiceMock = {
      get: (): any => 0
    };
    const configServiceMock = {
      get: (): any => 0
    };

    let service: ActionConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ActionConfigService,
          {
            provide: AppConfigService,
            useValue: appConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<ActionConfigService>(ActionConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("cacheMax should be defined", () => {
      expect(service.cacheMax).toBe(0);
    });

    it("cachePort should be defined", () => {
      expect(service.cachePort).toBe(0);
    });
  });

  describe("ActionService get: string", () => {
    const appConfigServiceMock = {
      get: (): any => ""
    };
    const configServiceMock = {
      get: (): any => ""
    };

    let service: ActionConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ActionConfigService,
          {
            provide: AppConfigService,
            useValue: appConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<ActionConfigService>(ActionConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("cacheHost cacheHostshould be defined", () => {
      expect(service.cacheHost).toBe("");
    });

    it("cacheStore should be defined", () => {
      expect(service.cacheStore).toBe("");
    });

    it.todo("cacheTTL should be defined");
  });
});
