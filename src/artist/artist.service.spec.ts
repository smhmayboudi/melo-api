import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistService } from "../data/data.artist.service";
import { DataConfigService } from "../data/data.config.service";
import { RelationService } from "../relation/relation.service";
import { ArtistService } from "./artist.service";

describe("ArtistService", () => {
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        ConfigService,
        DataArtistService,
        DataConfigService,
        HttpService,
        RelationService
      ]
    }).compile();

    service = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("albums");
  test.todo("byId");
  test.todo("follow");
  test.todo("following");
  test.todo("songs");
  test.todo("songs/top");
  test.todo("trending");
  test.todo("trending/genre");
  test.todo("unfollow");
});
