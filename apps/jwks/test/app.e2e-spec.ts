import { JwksModule } from "./../src/jwks.module";
import { Test } from "@nestjs/testing";

describe("jwks (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [JwksModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
