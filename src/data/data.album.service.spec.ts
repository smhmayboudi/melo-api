import { HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataAlbumService } from "./data.album.service";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHttpModuleOptionsFactory } from "./data.http.options.factory";
import { DataModule } from "./data.module";

describe("DataAlbumService", () => {
  let service: DataAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(config),
        HttpModule.registerAsync({
          imports: [DataModule],
          useClass: DataHttpModuleOptionsFactory
        })
      ],
      providers: [DataConfigService, DataAlbumService]
    }).compile();

    service = module.get<DataAlbumService>(DataAlbumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("byId");
  test.todo("latest");
});
