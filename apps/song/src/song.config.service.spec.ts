import { ConfigService } from "@nestjs/config";
import { SongConfigService } from "./song.config.service";
import { Test } from "@nestjs/testing";

describe("SongConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: SongConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        SongConfigService,
      ],
    }).compile();
    service = module.get<SongConfigService>(SongConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("elasticsearchNode should return value", () => {
    expect(service.elasticsearchNode).toEqual("");
  });

  it("imagePath should return value", () => {
    expect(service.imagePath).toEqual("");
  });

  it("imagePathDefaultSong should return value", () => {
    expect(service.imagePathDefaultSong).toEqual("");
  });

  it("index should return value", () => {
    expect(service.indexName).toEqual("");
  });

  it("maxSize should return a value", () => {
    expect(service.maxSize).toEqual(0);
  });

  it("mp3Endpoint should return value", () => {
    expect(service.mp3Endpoint).toEqual("");
  });

  it("sendUrl should return value", () => {
    expect(service.sendUrl).toEqual("");
  });

  it("sendTimeout should return value", () => {
    expect(service.sendTimeout).toEqual(0);
  });

  it("servicePort should be equal to a value", () => {
    expect(service.servicePort).toEqual(0);
  });

  it("serviceRetryAttempts should be equal to a value", () => {
    expect(service.serviceRetryAttempts).toEqual(0);
  });

  it("serviceRetryDelay should be equal to a value", () => {
    expect(service.serviceRetryDelay).toEqual(0);
  });

  it("serviceUrl should be equal to a value", () => {
    expect(service.serviceUrl).toEqual("");
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

  it("typeormUsername should be equal to a value", () => {
    expect(service.typeormUsername).toEqual("");
  });

  it("typeormSynchronize should be equal to a value", () => {
    expect(service.typeormSynchronize).toEqual(false);
  });
});
