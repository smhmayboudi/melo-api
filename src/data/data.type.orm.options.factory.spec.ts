import { Test, TestingModule } from "@nestjs/testing";

import { AppTypeOrmLogger } from "../app/app.type.orm.logger";
import { DataCacheEntity } from "./data.cache.entity";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataSiteEntity } from "./data.site.entity";
import { DataTypeOrmOptionsFactory } from "./data.type.orm.options.factory";

describe("DataTypeOrmOptionsFactory", () => {
  const dataConfigServiceMock: DataConfigServiceInterface = {
    defaultAlbumImagePath: "",
    defaultArtistImagePath: "",
    defaultSongImagePath: "",
    elasticNode: "",
    imagePath: () => "",
    index: "",
    mp3Endpoint: "",
    resultSize: 0,
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };

  let service: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      logger: new AppTypeOrmLogger(true),
      logging: true,
      name: undefined,
      password: "",
      port: 0,
      synchronize: true,
      type: "mysql",
      username: "",
    });
  });
});
