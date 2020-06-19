import { CommonTypeOrmLogger } from "@melo/common";
import { SongCacheEntity } from "./song.cache.entity";
import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import { SongSiteEntity } from "./song.site.entity";
import { SongTypeOrmOptionsFactory } from "./song.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("SongTypeOrmOptionsFactory", () => {
  const songConfigServiceMock: SongConfigServiceInterface = {
    elasticsearchNode: "",
    imagePath: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    sendTimeout: 0,
    sendUrl: "",
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
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
    expect(new SongTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new SongTypeOrmOptionsFactory(service).createTypeOrmOptions()
    ).toEqual({
      database: "",
      entities: [SongCacheEntity, SongSiteEntity],
      host: "",
      logger: new CommonTypeOrmLogger(true),
      logging: true,
      password: "",
      port: 0,
      synchronize: true,
      type: "mysql",
      username: "",
    });
  });
});
