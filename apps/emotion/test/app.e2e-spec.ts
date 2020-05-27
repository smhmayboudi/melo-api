import { Test, TestingModule } from "@nestjs/testing";

import { EmotionModule } from "./../src/emotion.module";

describe("emotion (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EmotionModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
