import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { AppHashIdService } from "../app.hash-id.service";
import { AlbumController } from "./album.controller";

describe("AlbumController", () => {
  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [AppConfigService, AppHashIdService, ConfigService]
    }).compile();

    controller = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("byId");
  test.todo("latest");
});
