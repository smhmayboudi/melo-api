import { AppModule } from "../src/app/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

describe("melo-api (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
