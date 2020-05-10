import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { DownloadConfigService } from "./download.config.service";

describe("DownloadService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0,
    };

    let service: DownloadConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DownloadConfigService,
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
      service = module.get<DownloadConfigService>(DownloadConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("resultSize should return a value", () => {
      expect(service.resultSize).toEqual(0);
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => "",
    };

    let service: DownloadConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DownloadConfigService,
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
      service = module.get<DownloadConfigService>(DownloadConfigService);
    });

    it("elasticNode should return value", () => {
      expect(service.elasticNode).toEqual("");
    });

    it("index should return value", () => {
      expect(service.index).toEqual("");
    });
  });
});
