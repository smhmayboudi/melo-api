import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";

describe("SearchConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: SearchConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    elasticNode: "",
    indexName: "",
    maxSize: 0,
    scriptScore: "",
    suggestIndex: "",
  };
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: SearchConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchConfigService,
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
    service = module.get<SearchConfigService>(SearchConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost cacheHost should be equal to a value", () => {
    expect(service.cacheHost).toEqual("");
  });

  it("cacheMax should be equal to a value", () => {
    expect(service.cacheMax).toEqual(0);
  });

  it("cachePort should be equal to a value", () => {
    expect(service.cachePort).toEqual(0);
  });

  it("cacheStore should be equal to a value", () => {
    expect(service.cacheStore).toEqual("");
  });

  it("cacheTTL should be equal to a value", () => {
    expect(service.cacheTTL).toEqual(0);
  });

  it("elasticNode should be equal to a value", () => {
    expect(service.elasticNode).toEqual("");
  });

  it("indexName should be equal to a value", () => {
    expect(service.indexName).toEqual("");
  });

  it("maxSize should be equal to a value", () => {
    expect(service.maxSize).toEqual(0);
  });

  it("scriptScore should be equal to a value", () => {
    expect(service.scriptScore).toEqual("");
  });

  it("suggestIndex should be equal to a value", () => {
    expect(service.suggestIndex).toEqual("");
  });
});
