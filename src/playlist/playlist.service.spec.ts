import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { DataModule } from "../data/data.module";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistSchema } from "./playlist.schema";
import { PlaylistService } from "./playlist.service";

describe("PlaylistService", () => {
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        DataModule,
        MongooseModule.forFeature([
          { name: "Playlist", schema: PlaylistSchema }
        ])
      ],
      providers: [PlaylistConfigService, PlaylistService]
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("addSong");
  test.todo("create");
  test.todo("delete");
  test.todo("deleteSong");
  test.todo("edit");
  test.todo("get");
  test.todo("my");
  test.todo("top");
});
