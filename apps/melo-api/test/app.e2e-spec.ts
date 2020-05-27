import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app/app.module";
import { INestApplication } from "@nestjs/common";

describe("melo-api (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
