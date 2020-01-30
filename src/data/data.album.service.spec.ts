import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { AtConfigService } from "../at/at.config.service";
import { DataAlbumService } from "./data.album.service";
import { DataConfigService } from "./data.config.service";

describe("DataAlbumService", () => {
  let service: DataAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        AtConfigService,
        ConfigService,
        DataAlbumService,
        DataConfigService,
        HttpService
      ]
    }).compile();

    service = module.get<DataAlbumService>(DataAlbumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("byId");
  test.todo("latest");
});
