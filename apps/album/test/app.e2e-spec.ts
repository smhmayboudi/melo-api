import { Test, TestingModule } from "@nestjs/testing";

import { AlbumModule } from "./../src/album.module";

describe("album (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AlbumModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
