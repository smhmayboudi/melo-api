import { ActionBulkReqDto, ActionType } from "@melo/common";

import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ActionServiceInterface } from "./action.service.interface";
import { Test } from "@nestjs/testing";

describe("ActionController", () => {
  const datetime = new Date().toString();
  const action: ActionBulkReqDto = {
    datetime,
    type: ActionType.likeSong,
  };

  const actionServiceMock: ActionServiceInterface = {
    bulk: () => Promise.resolve(action),
  };

  let controller: ActionController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ActionController],
      providers: [{ provide: ActionService, useValue: actionServiceMock }],
    }).compile();
    controller = module.get<ActionController>(ActionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("bulk should be equal to an action", async () => {
    const dto: ActionBulkReqDto = {
      datetime,
      type: ActionType.likeSong,
    };
    expect(await controller.bulk(dto)).toEqual(action);
  });
});
