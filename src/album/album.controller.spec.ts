import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { DataModule } from "../data/data.module";
import config from "./album.config";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";

describe("AlbumController", () => {
  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        DataModule
      ],
      controllers: [AlbumController],
      providers: [AlbumService]
    }).compile();

    controller = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("artistAlbums");
  test.todo("byId");
  test.todo("latest");
});
