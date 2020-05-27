import { Test, TestingModule } from "@nestjs/testing";

import { ConfigService } from "@nestjs/config";
import { DataConfigService } from "./data.config.service";

describe("DataConfigService", () => {
  describe("get: boolean", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): boolean => true,
    };

    let service: DataConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
          DataConfigService,
        ],
      }).compile();
      service = module.get<DataConfigService>(DataConfigService);
    });

    it("imageEncode should be equal to a value", () => {
      expect(service.imageEncode).toEqual(true);
    });

    it("typeOrmLogging should be equal to a value", () => {
      expect(service.typeOrmLogging).toEqual(true);
    });

    it("typeOrmSynchronize should be equal to a value", () => {
      expect(service.typeOrmSynchronize).toEqual(true);
    });
  });

  describe("get: JSON", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => '{"a":0}',
    };

    let service: DataConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
          DataConfigService,
        ],
      }).compile();
      service = module.get<DataConfigService>(DataConfigService);
    });

    it("imageTypeSize should be equal to a value", () => {
      expect(service.imageTypeSize).toEqual({ a: 0 });
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
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
          DataConfigService,
        ],
      }).compile();
      service = module.get<DataConfigService>(DataConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("maxSize should return a value", () => {
      expect(service.maxSize).toEqual(0);
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
          {
            provide: ConfigService,
            useValue: configServiceMock,
          },
          DataConfigService,
        ],
      }).compile();
      service = module.get<DataConfigService>(DataConfigService);
    });

    it("imagePathDefaultAlbum should return value", () => {
      expect(service.imagePathDefaultAlbum).toEqual("");
    });

    it("imagePathDefaultArtist should return value", () => {
      expect(service.imagePathDefaultArtist).toEqual("");
    });

    it("imagePathDefaultSong should return value", () => {
      expect(service.imagePathDefaultSong).toEqual("");
    });

    it("elasticNode should return value", () => {
      expect(service.elasticNode).toEqual("");
    });

    it("imagePath should return value", () => {
      expect(service.imagePath).toEqual("");
    });

    it("imageBaseUrl should be equal to a value", () => {
      expect(service.imageBaseUrl).toEqual("");
    });

    it("imageKey should be equal to a value", () => {
      expect(service.imageKey).toEqual("");
    });

    it("imageSalt should be equal to a value", () => {
      expect(service.imageSalt).toEqual("");
    });

    it("imageSignatureSize should be equal to a value", () => {
      expect(service.imageSignatureSize).toEqual("");
    });

    it("index should return value", () => {
      expect(service.indexName).toEqual("");
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
