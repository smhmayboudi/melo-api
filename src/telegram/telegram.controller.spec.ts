import { Test, TestingModule } from "@nestjs/testing";
import { TelegramController } from "./telegram.controller";

describe("Telegram Controller", () => {
  let controller: TelegramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramController]
    }).compile();

    controller = module.get<TelegramController>(TelegramController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("send/song");
});
