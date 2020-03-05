import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ActionType } from "./action.type";
import { ActionDto } from "./dto/action.dto";

describe("ActionController", () => {
  const actionServiceMock = {
    bulk: (): {} => ({})
  };
  const appHashIdServiceMock = {
    decode: (): number => 0,
    encode: (): string => ""
  };

  let controller: ActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionController],
      providers: [
        { provide: ActionService, useValue: actionServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock }
      ]
    }).compile();
    controller = module.get<ActionController>(ActionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("bulk should be defined", async () => {
    const req: ActionDto = {
      datetime: new Date().toString(),
      type: ActionType.likeSong
    };
    expect(await controller.bulk(req)).toBeDefined();
  });
});
