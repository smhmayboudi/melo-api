import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { RelationConfigService } from "../relation/relation.config.service";
import { ArtistService } from "../artist/artist.service";
import { RelationService } from "../relation/relation.service";
import { DataArtistService } from "./data.artist.service";
import { DataConfigService } from "./data.config.service";

describe("DataArtistService", () => {
  let service: DataArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        ConfigService,
        DataArtistService,
        DataConfigService,
        RelationConfigService,
        RelationService,
        HttpService
      ]
    }).compile();

    service = module.get<DataArtistService>(DataArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("albums");
  test.todo("byId");
  test.todo("byIds");
  test.todo("songs");
  test.todo("songsTop");
  test.todo("trending");
  test.todo("trendingGenre");
});
