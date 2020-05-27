import { Test, TestingModule } from "@nestjs/testing";

import { JwksModule } from "./../src/jwks.module";

describe("jwks (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [JwksModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
