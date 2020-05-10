import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { SearchConfigService } from "./search.config.service";

describe("SearchService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0,
    };

    let service: SearchConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          SearchConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
        ],
      }).compile();
      service = module.get<SearchConfigService>(SearchConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("cacheMax should be equal to a value", () => {
      expect(service.cacheMax).toEqual(0);
    });

    it("cachePort should be equal to a value", () => {
      expect(service.cachePort).toEqual(0);
    });

    it("resultSize should be equal to a value", () => {
      expect(service.resultSize).toEqual(0);
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => "",
    };

    let service: SearchConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          SearchConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
        ],
      }).compile();
      service = module.get<SearchConfigService>(SearchConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("cacheHost cacheHost should be equal to a value", () => {
      expect(service.cacheHost).toEqual("");
    });

    it("cacheStore should be equal to a value", () => {
      expect(service.cacheStore).toEqual("");
    });

    it("elasticNode should be equal to a value", () => {
      expect(service.elasticNode).toEqual("");
    });

    it("elasticScriptScore should be equal to a value", () => {
      expect(service.elasticScriptScore).toEqual("");
    });

    it("index should be equal to a value", () => {
      expect(service.index).toEqual("");
    });

    it("suggestIndex should be equal to a value", () => {
      expect(service.suggestIndex).toEqual("");
    });

    it.todo("cacheTTL should be equal to a value");
  });
});
