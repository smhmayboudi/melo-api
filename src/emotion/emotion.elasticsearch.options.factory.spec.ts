import { Test, TestingModule } from "@nestjs/testing";

import { EmotionConfigService } from "./emotion.config.service";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { EmotionElasticsearchOptionsFactory } from "./emotion.elasticsearch.options.factory";

describe("EmotionElasticsearchOptionsFactory", () => {
  const emotionConfigServiceMock: EmotionConfigServiceInterface = {
    elasticNode: "",
    index: "",
    resultSize: 0,
  };

  let service: EmotionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EmotionConfigService,
          useValue: emotionConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<EmotionConfigService>(EmotionConfigService);
  });

  it("should be defined", () => {
    expect(new EmotionElasticsearchOptionsFactory(service)).toBeDefined();
  });

  it("createElasticsearchOptions should return an option", () => {
    expect(
      new EmotionElasticsearchOptionsFactory(
        service
      ).createElasticsearchOptions()
    ).toBeDefined();
  });
});
