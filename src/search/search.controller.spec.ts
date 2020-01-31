import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataModule } from "../data/data.module";
import { AppModule } from "../app.module";
import config from "./search.config";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

describe("SearchController", () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        DataModule
      ],
      providers: [SearchConfigService, SearchService]
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("mood");
  test.todo("query");
});
