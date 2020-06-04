import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import { SongHttpOptionsFactory } from "./song.http.options.factory";
import { Test } from "@nestjs/testing";

describe("SongHttpOptionsFactory", () => {
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
    expect(new SongHttpOptionsFactory(service)).toBeDefined();
  });

  it("createHttpOptions should be equal to an option", () => {
    expect(new SongHttpOptionsFactory(service).createHttpOptions()).toEqual({
      timeout: 0,
    });
  });
});
