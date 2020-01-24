import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistService } from "./data.artist.service";

describe("DataArtistService", () => {
  let service: DataArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataArtistService]
    }).compile();

    service = module.get<DataArtistService>(DataArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("albums");
  test.todo("byId");
  test.todo("byIds");
  test.todo("songs");
  test.todo("songsTop");
  test.todo("trending");
  test.todo("trendingGenre");
});
