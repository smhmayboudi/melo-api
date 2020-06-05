import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import { SongElasticsearchOptionsFactory } from "./song.elasticsearch.options.factory";
import { Test } from "@nestjs/testing";

describe("SongElasticsearchOptionsFactory", () => {
  const songConfigServiceMock: SongConfigServiceInterface = {
    elasticsearchNode: "",
    imagePath: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    sendTimeout: 0,
    sendUrl: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: SongConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: SongConfigService,
          useValue: songConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<SongConfigService>(SongConfigService);
  });

  it("should be defined", () => {
    expect(new SongElasticsearchOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new SongElasticsearchOptionsFactory(service).createElasticsearchOptions()
    ).toEqual({
      node: "",
    });
  });
});
