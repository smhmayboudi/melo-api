import { ArtistConfigService } from "./artist.config.service";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

describe("ArtistConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: ArtistConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        ArtistConfigService,
      ],
    }).compile();
    service = module.get<ArtistConfigService>(ArtistConfigService);
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

  it("imagePathDefaultArtist should return value", () => {
    expect(service.imagePathDefaultArtist).toEqual("");
  });

  it("index should return value", () => {
    expect(service.indexName).toEqual("");
  });

  it("maxSize should return a value", () => {
    expect(service.maxSize).toEqual(0);
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
});
