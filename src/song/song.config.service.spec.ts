import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { SongConfigService } from "./song.config.service";

describe("SongService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0
    };

    let service: SongConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          SongConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<SongConfigService>(SongConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("cacheMax should be defined", () => {
      expect(service.cacheMax).toEqual(0);
    });

    it("cachePort should be defined", () => {
      expect(service.cachePort).toEqual(0);
    });

    it("timeout should be defined", () => {
      expect(service.timeout).toEqual("0ms");
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => ""
    };

    let service: SongConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          SongConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<SongConfigService>(SongConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("cacheHost cacheHostshould be defined", () => {
      expect(service.cacheHost).toEqual("");
    });

    it("cacheStore should be defined", () => {
      expect(service.cacheStore).toEqual("");
    });

    it.todo("cacheTTL should be defined");

    it("sendTelegramUrl should be defined", () => {
      expect(service.sendTelegramUrl).toEqual("");
    });
  });
});
