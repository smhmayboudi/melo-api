import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { PlaylistConfigService } from "./playlist.config.service";

describe("PlaylistService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0
    };

    let service: PlaylistConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          PlaylistConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<PlaylistConfigService>(PlaylistConfigService);
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
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => ""
    };

    let service: PlaylistConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          PlaylistConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<PlaylistConfigService>(PlaylistConfigService);
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

    it("defaultImagePath should be defined", () => {
      expect(service.defaultImagePath).toEqual("");
    });

    it("imagePath should be defined", () => {
      expect(service.imagePath("0")).toEqual("");
    });
  });
});
