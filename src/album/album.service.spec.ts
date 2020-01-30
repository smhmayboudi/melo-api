import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataAlbumService } from "../data/data.album.service";
import { DataConfigService } from "../data/data.config.service";
import { AlbumService } from "./album.service";

describe("AlbumService", () => {
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        ConfigService,
        DataAlbumService,
        DataConfigService,
        HttpService
      ]
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("byId");
  test.todo("latest");
});
