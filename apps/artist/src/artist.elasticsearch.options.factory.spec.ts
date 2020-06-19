import { ArtistConfigService } from "./artist.config.service";
import { ArtistConfigServiceInterface } from "./artist.config.service.interface";
import { ArtistElasticsearchOptionsFactory } from "./artist.elasticsearch.options.factory";
import { Test } from "@nestjs/testing";

describe("ArtistElasticsearchOptionsFactory", () => {
  const artistConfigServiceMock: ArtistConfigServiceInterface = {
    elasticsearchNode: "",
    imagePath: "",
    imagePathDefaultArtist: "",
    indexName: "",
    maxSize: 0,
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
  };

  let service: ArtistConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ArtistConfigService,
          useValue: artistConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<ArtistConfigService>(ArtistConfigService);
  });

  it("should be defined", () => {
    expect(new ArtistElasticsearchOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new ArtistElasticsearchOptionsFactory(
        service
      ).createElasticsearchOptions()
    ).toEqual({
      node: "",
    });
  });
});
