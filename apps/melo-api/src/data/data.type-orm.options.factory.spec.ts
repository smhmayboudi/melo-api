import { CommonTypeOrmLogger } from "@melo/common";
import { DataCacheEntity } from "./data.cache.entity";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataSiteEntity } from "./data.site.entity";
import { DataTypeOrmOptionsFactory } from "./data.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("DataTypeOrmOptionsFactory", () => {
  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticsearchNode: "",
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    imageSalt: "",
    imageSignatureSize: 32,
    imageTypeSize: [
      {
        height: 1024,
        name: "cover",
        width: 1024,
      },
    ],
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: DataConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: DataConfigService,
          useValue: dataConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(new DataTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new DataTypeOrmOptionsFactory(service).createTypeOrmOptions()
    ).toEqual({
      database: "",
      entities: [DataCacheEntity, DataSiteEntity],
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
