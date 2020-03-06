import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { DataConfigService } from "./data.config.service";

describe("DataService", () => {
  describe("get: number", () => {
    const configServiceMock = {
      get: (): number => 0
    };

    let service: DataConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataConfigService,
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<DataConfigService>(DataConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    test.todo("timeout");
  });
  describe("get: string", () => {
    const configServiceMock = {
      get: (): string => ""
    };

    let service: DataConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataConfigService,
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<DataConfigService>(DataConfigService);
    });
    it("url should be defined", () => {
      expect(service.url).toBe("");
    });
  });
});
