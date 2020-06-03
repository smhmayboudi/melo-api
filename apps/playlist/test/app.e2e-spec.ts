import { PlaylistModule } from "./../src/playlist.module";
import { Test } from "@nestjs/testing";

describe("playlist (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [PlaylistModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
