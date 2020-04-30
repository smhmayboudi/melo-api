import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { EmotionConfigService } from "./emotion.config.service";

describe("EmotionService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0,
    };

    let service: EmotionConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          EmotionConfigService,
          {
            provide: AppConfigService,
            useValue: {},
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

    it("requestLimit should return a value", () => {
      expect(service.requestLimit).toEqual(0);
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => "",
    };

    let service: EmotionConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          EmotionConfigService,
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
        ],
      }).compile();
      service = module.get<EmotionConfigService>(EmotionConfigService);
    });

    it("elasticNode should return value", () => {
      expect(service.elasticNode).toEqual("");
    });

    it("index should return value", () => {
      expect(service.index).toEqual("");
    });
  });
});
