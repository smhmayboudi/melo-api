import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { RelationConfigService } from "./relation.config.service";

describe("RelationService", () => {
  describe("get: number", () => {
    const configServiceMock = {
      get: (): number => 0
    };

    let service: RelationConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          RelationConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<RelationConfigService>(RelationConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("timeout should be defined", () => {
      expect(service.timeout).toBeDefined();
    });
  });

  describe("get: string", () => {
    const configServiceMock = {
      get: (): number => 0
    };

    let service: RelationConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          RelationConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<RelationConfigService>(RelationConfigService);
    });
    it("url should be defined", () => {
      expect(service.url).toBeDefined();
    });
  });
});
