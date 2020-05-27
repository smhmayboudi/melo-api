import { Test, TestingModule } from "@nestjs/testing";

import { ConstModule } from "./../src/const.module";

describe("const (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConstModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
