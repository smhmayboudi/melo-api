import { forwardRef, HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { DataModule } from "../data/data.module";
import { RelationModule } from "../relation/relation.module";
import { UserModule } from "../user/user.module";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";
import { SongController } from "./song.controller";
import { SongHttpModuleOptionsFactory } from "./song.http.options.factory";
import { SongModule } from "./song.module";
import { SongService } from "./song.service";

describe("SongController", () => {
  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        DataModule,
        HttpModule.registerAsync({
          imports: [SongModule],
          useClass: SongHttpModuleOptionsFactory
        }),
        RelationModule,
        UserModule
      ],
      providers: [SongConfigService, SongService]
    }).compile();

    controller = module.get<SongController>(SongController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("artistSongs");
  test.todo("artistSongsTop");
  test.todo("byId");
  test.todo("genre");
  test.todo("language");
  test.todo("like");
  test.todo("liked");
  test.todo("mood");
  test.todo("new");
  test.todo("newPodcast");
  test.todo("podcastGenres");
  test.todo("sendTelegram");
  test.todo("similar");
  test.todo("slider");
  test.todo("topDay");
  test.todo("topWeek");
  test.todo("unlike");
});
