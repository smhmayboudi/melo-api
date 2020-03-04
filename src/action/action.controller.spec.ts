import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./action.config";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";

describe("ActionController", () => {
  let controller: ActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [ActionService]
    }).compile();
    controller = module.get<ActionController>(ActionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("bulk");
});
