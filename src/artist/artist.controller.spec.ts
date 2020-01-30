import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistService } from "../data/data.artist.service";
import { DataConfigService } from "../data/data.config.service";
import { RelationService } from "../relation/relation.service";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

describe("ArtistController", () => {
  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        ArtistService,
        ConfigService,
        DataArtistService,
        DataConfigService,
        HttpService,
        RelationService
      ]
    }).compile();

    controller = module.get<ArtistController>(ArtistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
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
