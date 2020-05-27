import { Test, TestingModule } from "@nestjs/testing";

import { ArtistModule } from "./../src/artist.module";

describe("artist (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArtistModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
