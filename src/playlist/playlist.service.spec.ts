import { Test, TestingModule } from "@nestjs/testing";
import { PlaylistService } from "./playlist.service";

describe("PlaylistService", () => {
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistService]
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("addSong");
  test.todo("create");
  test.todo("delete");
  test.todo("edit");
  test.todo("get");
  test.todo("my");
  test.todo("song");
  test.todo("top");
});