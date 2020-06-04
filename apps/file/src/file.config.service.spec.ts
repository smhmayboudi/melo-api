import { ConfigService } from "@nestjs/config";
import { FileConfigService } from "./file.config.service";
import { Test } from "@nestjs/testing";

describe("FileConfigService", () => {
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

  it("typeormDatabase should be equal to a value", () => {
    expect(service.typeormDatabase).toEqual("");
  });

  it("typeormHost should be equal to a value", () => {
    expect(service.typeormHost).toEqual("");
  });

  it("typeormLogging should be equal to a value", () => {
    expect(service.typeormLogging).toEqual(true);
  });

  it("typeormPassword should be equal to a value", () => {
    expect(service.typeormPassword).toEqual("");
  });

  it("typeormPort should be equal to a value", () => {
    expect(service.typeormPort).toEqual(0);
  });

  it("typeormSynchronize should be equal to a value", () => {
    expect(service.typeormSynchronize).toEqual(true);
  });

  it("typeormUsername should be equal to a value", () => {
    expect(service.typeormUsername).toEqual("");
  });
});
