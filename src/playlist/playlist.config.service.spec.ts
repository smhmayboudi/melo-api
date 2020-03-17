import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
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

    it("cacheMax should be equal to a value", () => {
      expect(service.cacheMax).toEqual(0);
    });

    it("cachePort should be equal to a value", () => {
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

    it("cacheHost cacheHost should be equal to a value", () => {
      expect(service.cacheHost).toEqual("");
    });

    it("cacheStore should be equal to a value", () => {
      expect(service.cacheStore).toEqual("");
    });

    it.todo("cacheTTL should be equal to a value");

    it("defaultImagePath should be equal to a value", () => {
      expect(service.defaultImagePath).toEqual("");
    });

    it("imagePath should return a value", () => {
      expect(service.imagePath("0")).toEqual("");
    });
  });
});
