import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { DataConfigService } from "./data.config.service";

describe("DataService", () => {
  describe("get: boolean", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): boolean => true,
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AppConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
        ],
      }).compile();
      service = module.get<AppConfigService>(AppConfigService);
    });

    it("typeOrmLogging should be equal to a value", () => {
      expect(service.typeOrmLogging).toEqual(true);
    });

    it("typeOrmSynchronize should be equal to a value", () => {
      expect(service.typeOrmSynchronize).toEqual(true);
    });
  });

  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0,
    };

    let service: DataConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataConfigService,
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
      service = module.get<DataConfigService>(DataConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("resultSize should return a value", () => {
      expect(service.resultSize).toEqual(0);
    });

    it("typeOrmPort should be equal to a value", () => {
      expect(service.typeOrmPort).toEqual(0);
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => "",
    };

    let service: DataConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataConfigService,
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
      service = module.get<DataConfigService>(DataConfigService);
    });

    it("defaultAlbumImagePath should return value", () => {
      expect(service.defaultAlbumImagePath).toEqual("");
    });

    it("defaultArtistImagePath should return value", () => {
      expect(service.defaultArtistImagePath).toEqual("");
    });

    it("defaultSongImagePath should return value", () => {
      expect(service.defaultSongImagePath).toEqual("");
    });

    it("elasticNode should return value", () => {
      expect(service.elasticNode).toEqual("");
    });

    it("imagePath should return value", () => {
      expect(service.imagePath("")).toEqual("");
    });

    it("index should return value", () => {
      expect(service.index).toEqual("");
    });

    it("mp3Endpoint should return value", () => {
      expect(service.mp3Endpoint).toEqual("");
    });

    it("typeOrmDatabase should be equal to a value", () => {
      expect(service.typeOrmDatabase).toEqual("");
    });

    it("typeOrmHost should be equal to a value", () => {
      expect(service.typeOrmHost).toEqual("");
    });

    it("typeOrmPassword should be equal to a value", () => {
      expect(service.typeOrmPassword).toEqual("");
    });

    it("typeOrmUsername should be equal to a value", () => {
      expect(service.typeOrmUsername).toEqual("");
    });
  });
});
