import { Test, TestingModule } from "@nestjs/testing";

import { DataConfigService } from "../data/data.config.service";
import { DataConfigServiceInterface } from "../data/data.config.service.interface";
import { DataElasticsearchOptionsFactory } from "./data.elasticsearch.options.factory";

describe("DataElasticsearchOptionsFactory", () => {
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
    expect(new DataElasticsearchOptionsFactory(service)).toBeDefined();
  });

  it("createElasticsearchOptions should return an option", () => {
    expect(
      new DataElasticsearchOptionsFactory(service).createElasticsearchOptions()
    ).toBeDefined();
  });
});
