import { ConstModule } from "./../src/const.module";
import { Test } from "@nestjs/testing";

describe("const (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ConstModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
