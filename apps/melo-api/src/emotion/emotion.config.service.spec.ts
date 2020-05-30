import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";

describe("EmotionConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: EmotionConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
  };

  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: EmotionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionConfigService,
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
    service = module.get<EmotionConfigService>(EmotionConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost cacheHost should be equal to a value", () => {
    expect(service.elasticsearchNode).toEqual("");
  });

  it("cacheMax should be equal to a value", () => {
    expect(service.indexName).toEqual("");
  });

  it("cachePort should be equal to a value", () => {
    expect(service.maxSize).toEqual(0);
  });
});
