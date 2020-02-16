import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./const.config";
import { ConstConfigService } from "./const.config.service";
import { ConstService } from "./const.service";

describe("ConstService", () => {
  let service: ConstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [ConstConfigService, ConstService]
    }).compile();

    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("images");
});
