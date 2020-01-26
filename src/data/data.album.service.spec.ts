import { Test, TestingModule } from "@nestjs/testing";
import { DataAlbumService } from "./data.album.service";

describe("DataAlbumService", () => {
  let service: DataAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAlbumService]
    }).compile();

    service = module.get<DataAlbumService>(DataAlbumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("byId");
  test.todo("latest");
});
