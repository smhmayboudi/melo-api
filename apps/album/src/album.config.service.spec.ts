import { AlbumConfigService } from "./album.config.service";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

describe("AlbumConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: AlbumConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        AlbumConfigService,
      ],
    }).compile();
    service = module.get<AlbumConfigService>(AlbumConfigService);
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

  it("imagePathDefaultAlbum should return value", () => {
    expect(service.imagePathDefaultAlbum).toEqual("");
  });

  it("index should return value", () => {
    expect(service.indexName).toEqual("");
  });

  it("maxSize should return a value", () => {
    expect(service.maxSize).toEqual(0);
  });
});
