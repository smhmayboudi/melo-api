import { Test, TestingModule } from "@nestjs/testing";

import { ActionController } from "./action.controller";
import { ActionDto } from "./dto/action.dto";
import { ActionService } from "./action.service";
import { ActionServiceInterface } from "./action.service.interface";
import { ActionType } from "./action.type";

describe("ActionController", () => {
  const datetime = new Date().toString();
  const action: ActionDto = {
    datetime,
    type: ActionType.likeSong,
  };

  const actionServiceMock: ActionServiceInterface = {
    bulk: (): Promise<ActionDto> => Promise.resolve(action),
  };

  let controller: ActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionController],
      providers: [{ provide: ActionService, useValue: actionServiceMock }],
    }).compile();
    controller = module.get<ActionController>(ActionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("bulk should be equal to an action", async () => {
    const dto: ActionDto = {
      datetime,
      type: ActionType.likeSong,
    };
    expect(await controller.bulk(dto)).toEqual(action);
  });
});
