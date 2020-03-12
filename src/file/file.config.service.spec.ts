import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { FileConfigService } from "./file.config.service";

describe("FileService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0
    };

    let service: FileConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FileConfigService,
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
      service = module.get<FileConfigService>(FileConfigService);
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

    let service: FileConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FileConfigService,
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
      service = module.get<FileConfigService>(FileConfigService);
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

    it("s3AccessKeyId should return a value", () => {
      expect(service.s3AccessKeyId).toEqual("");
    });

    it("s3Bucket should return a value", () => {
      expect(service.s3Bucket).toEqual("");
    });

    it("s3Endpoint should return a value", () => {
      expect(service.s3Endpoint).toEqual("");
    });

    it("s3SecretAccessKey should return a value", () => {
      expect(service.s3SecretAccessKey).toEqual("");
    });

    it.todo("s3SslEnabled should return a value");
  });
});
