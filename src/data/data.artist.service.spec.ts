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

  test.todo("artist/albums");
  test.todo("artist/byId");
  test.todo("artist/byIds");
  test.todo("artist/songs");
  test.todo("artist/songs/top");
  test.todo("artist/trending");
  test.todo("artist/trending/genre");
});
