import { EmotionConfigService } from "./emotion.config.service";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { EmotionElasticsearchOptionsFactory } from "./emotion.elasticsearch.options.factory";
import { Test } from "@nestjs/testing";

describe("EmotionElasticsearchOptionsFactory", () => {
  const emotionConfigServiceMock: EmotionConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
  };

  let service: EmotionConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new EmotionElasticsearchOptionsFactory(
        service
      ).createElasticsearchOptions()
    ).toEqual({
      node: "",
    });
  });
});
