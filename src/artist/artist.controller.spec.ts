import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { DataModule } from "../data/data.module";
import { RelationModule } from "../relation/relation.module";
import config from "./artist.config";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

describe("ArtistController", () => {
  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        DataModule,
        RelationModule
      ],
      providers: [ArtistService]
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
