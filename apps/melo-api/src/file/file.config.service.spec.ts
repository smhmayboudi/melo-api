import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { Test } from "@nestjs/testing";

describe("FileConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: FileConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    s3AccessKeyId: "minioadmin",
    s3Bucket: "misc",
    s3Endpoint: "127.0.0.1:9000",
    s3ForcePathStyle: false,
    s3SecretAccessKey: "minioadmin",
    s3SslEnabled: false,
  };

  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: FileConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FileConfigService,
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost cacheHost should be equal to a value", () => {
    expect(service.cacheHost).toEqual("");
  });

  it("cacheMax should be equal to a value", () => {
    expect(service.cacheMax).toEqual(0);
  });

  it("cachePort should be equal to a value", () => {
    expect(service.cachePort).toEqual(0);
  });

  it("cacheStore should be equal to a value", () => {
    expect(service.cacheStore).toEqual("");
  });

  it("cacheTTL should be equal to a value", () => {
    expect(service.cacheTTL).toEqual(0);
  });

  it("s3AccessKeyId should be equal to a value", () => {
    expect(service.s3AccessKeyId).toEqual("");
  });

  it("s3Bucket should be equal to a value", () => {
    expect(service.s3Bucket).toEqual("");
  });

  it("s3Endpoint should be equal to a value", () => {
    expect(service.s3Endpoint).toEqual("");
  });

  it("s3ForcePathStyle should be equal to a value", () => {
    expect(service.s3ForcePathStyle).toEqual(true);
  });

  it("s3SecretAccessKey should be equal to a value", () => {
    expect(service.s3SecretAccessKey).toEqual("");
  });

  it("s3SslEnabled should be equal to a value", () => {
    expect(service.s3SslEnabled).toEqual(true);
  });
});
