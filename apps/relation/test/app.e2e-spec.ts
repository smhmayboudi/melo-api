import { Test, TestingModule } from "@nestjs/testing";

import { RelationModule } from "./../src/relation.module";

describe("relation (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RelationModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/ (GET)");
});
