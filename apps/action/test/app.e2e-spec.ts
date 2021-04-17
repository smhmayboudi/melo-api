import { ActionModule } from "./../src/action.module";
import { Test } from "@nestjs/testing";

describe("action (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ActionModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
