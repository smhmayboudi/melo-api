import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { DataModule } from "../data/data.module";
import config from "./search.config";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        DataModule
      ],
      providers: [SearchService]
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("mood");
  test.todo("query");
});
