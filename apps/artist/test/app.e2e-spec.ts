import { ArtistModule } from "./../src/artist.module";
import { Test } from "@nestjs/testing";

describe("artist (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ArtistModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
