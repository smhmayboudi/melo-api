import { Test, TestingModule } from "@nestjs/testing";

import { DownloadModule } from "./../src/download.module";

describe("download (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DownloadModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
