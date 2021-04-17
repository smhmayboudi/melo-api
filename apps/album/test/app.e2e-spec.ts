import { AlbumModule } from "./../src/album.module";
import { Test } from "@nestjs/testing";

describe("album (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AlbumModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
