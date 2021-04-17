import { EmotionModule } from "./../src/emotion.module";
import { Test } from "@nestjs/testing";

describe("emotion (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [EmotionModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
