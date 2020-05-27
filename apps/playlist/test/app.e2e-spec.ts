import { Test, TestingModule } from "@nestjs/testing";

import { PlaylistModule } from "./../src/playlist.module";

describe("playlist (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PlaylistModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
