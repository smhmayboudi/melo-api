import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { ArtistConfigService } from "./artist.config.service";

describe("ArtistService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0
    };

    let service: ArtistConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          ArtistConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<ArtistConfigService>(ArtistConfigService);
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

    let service: ArtistConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          ArtistConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<ArtistConfigService>(ArtistConfigService);
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
  });
});
