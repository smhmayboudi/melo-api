import { Test, TestingModule } from "@nestjs/testing";
import { ArtistService } from "./artist.service";

describe("ArtistService", () => {
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistService]
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
