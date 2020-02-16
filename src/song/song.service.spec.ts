import { forwardRef, HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { DataModule } from "../data/data.module";
import { RelationModule } from "../relation/relation.module";
import { UserModule } from "../user/user.module";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";
import { SongHttpModuleOptionsFactory } from "./song.http.options.factory";
import { SongModule } from "./song.module";
import { SongService } from "./song.service";

describe("SongService", () => {
  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("artist/songs");
  test.todo("artist/songs/top");
  test.todo("byId");
  test.todo("genre");
  test.todo("language");
  test.todo("like");
  test.todo("liked");
  test.todo("mood");
  test.todo("new");
  test.todo("newPodcast");
  test.todo("podcast");
  test.todo("searchMood");
  test.todo("sendTelegram");
  test.todo("similar");
  test.todo("slider");
  test.todo("topDay");
  test.todo("topWeek");
  test.todo("unlike");
});
