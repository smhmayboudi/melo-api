import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { SearchConfigService } from "./search.config.service";

describe("SearchService", () => {
  describe("SearchService get: number", () => {
    const appConfigServiceMock = {
      get: (): number => 0
    };
    const configServiceMock = {
      get: (): number => 0
    };

    let service: SearchConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SearchConfigService,
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
      service = module.get<SearchConfigService>(SearchConfigService);
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

  describe("SearchService get: string", () => {
    const appConfigServiceMock = {
      get: (): string => ""
    };
    const configServiceMock = {
      get: (): string => ""
    };

    let service: SearchConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SearchConfigService,
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
      service = module.get<SearchConfigService>(SearchConfigService);
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
