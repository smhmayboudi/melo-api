import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { FileCacheOptionsFactory } from "./file.cache.options.factory";
import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";

describe("FileCacheOptionsFactory", () => {
  const fileConfigServiceMock: FileConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    s3AccessKeyId: "minioadmin",
    s3Bucket: "misc",
    s3Endpoint: "127.0.0.1:9000",
    s3SecretAccessKey: "minioadmin",
    s3SslEnabled: false,
  };

  let service: FileConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: ConfigService,
            useValue: {},
          },
          {
            provide: FileConfigService,
            useValue: fileConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<FileConfigService>(FileConfigService);
    });

    it("should be defined", () => {
      expect(new FileCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new FileCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: ConfigService,
            useValue: {},
          },
          {
            provide: FileConfigService,
            useValue: { ...fileConfigServiceMock, cacheStore: "none" },
          },
        ],
      }).compile();
      service = module.get<FileConfigService>(FileConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(new FileCacheOptionsFactory(service).createCacheOptions()).toEqual(
        {
          host: "",
          max: 0,
          port: 0,
          store: "none",
          ttl: 0,
        }
      );
    });
  });
});
