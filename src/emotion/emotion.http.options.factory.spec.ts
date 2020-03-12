import { Test, TestingModule } from "@nestjs/testing";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionHttpOptionsFactory } from "./emotion.http.options.factory";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";

describe("EmotionHttpOptionsFactory", () => {
  const emotionConfigServiceMock: EmotionConfigServiceInterface = {
    timeout: 0,
    url: ""
  };

  let service: EmotionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EmotionConfigService,
          useValue: emotionConfigServiceMock
        }
      ]
    }).compile();
    service = module.get<EmotionConfigService>(EmotionConfigService);
  });

  it("should be defined", () => {
    expect(new EmotionHttpOptionsFactory(service)).toBeDefined();
  });

  it("createHttpOptions should return an option", () => {
    expect(
      new EmotionHttpOptionsFactory(service).createHttpOptions()
    ).toBeDefined();
  });
});
