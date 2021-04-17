import { Test } from "@nestjs/testing";
import { UserModule } from "./../src/user.module";

describe("user (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
