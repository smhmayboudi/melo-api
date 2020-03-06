import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { SearchConfigService } from "./search.config.service";

describe("SearchService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0
    };

    let service: SearchConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          SearchConfigService,
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

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => ""
    };

    let service: SearchConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          SearchConfigService,
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
