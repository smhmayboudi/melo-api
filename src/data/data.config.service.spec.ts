import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { DataConfigService } from "./data.config.service";

describe("DataService", () => {
  describe("get: number", () => {
    // TODO: interface ?
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

    it("timeout should be equal to a value", () => {
      expect(service.timeout).toEqual("0ms");
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
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

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("jwtAuhSchema url should be equal to a value", () => {
      expect(service.url).toEqual("");
    });
  });
});
