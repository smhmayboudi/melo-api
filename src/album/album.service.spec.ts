import { Test, TestingModule } from "@nestjs/testing";
import { DataModule } from "../data/data.module";
import { AlbumService } from "./album.service";

describe("AlbumService", () => {
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataModule],
      providers: [AlbumService]
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("artistAlbums");
  test.todo("byId");
  test.todo("latest");
});
