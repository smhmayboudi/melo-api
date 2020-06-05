import { AlbumConfigService } from "./album.config.service";
import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { AlbumElasticsearchOptionsFactory } from "./album.elasticsearch.options.factory";
import { Test } from "@nestjs/testing";

describe("AlbumElasticsearchOptionsFactory", () => {
  const albumConfigServiceMock: AlbumConfigServiceInterface = {
    elasticsearchNode: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    indexName: "",
    maxSize: 0,
  };

  let service: AlbumConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AlbumConfigService,
          useValue: albumConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<AlbumConfigService>(AlbumConfigService);
  });

  it("should be defined", () => {
    expect(new AlbumElasticsearchOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new AlbumElasticsearchOptionsFactory(service).createElasticsearchOptions()
    ).toEqual({
      node: "",
    });
  });
});
