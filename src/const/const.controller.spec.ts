import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./const.config";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";

describe("ConstController", () => {
  let constController: ConstController;
  let constService: ConstService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [ConstConfigService, ConstService]
    }).compile();
    constController = module.get<ConstController>(ConstController);
    constService = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(constController).toBeDefined();
  });

  it("images should be defined", async () => {
    const res = {
      "": {
        "": {
          url: ""
        }
      }
    };
    jest
      .spyOn(constService, "images")
      .mockImplementation(() => Promise.resolve(res));

    expect(await constController.images()).toBe(res);
  });
});
