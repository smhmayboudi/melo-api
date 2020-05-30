import { ACTION_SERVICE, ActionBulkReqDto, ActionType } from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ActionService } from "./action.service";
import { of } from "rxjs";

describe("ActionService", () => {
  const datetime = new Date().toString();
  const action: ActionBulkReqDto = {
    datetime,
    type: ActionType.likeSong,
  };

  // TODO: interface ?
  const actionClientProxyMock = {
    send: () => of(action),
  };

  let service: ActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionService,
        {
          provide: ACTION_SERVICE,
          useValue: actionClientProxyMock,
        },
      ],
    }).compile();
    service = module.get<ActionService>(ActionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("bulk should be equal to an action", async () => {
    const dto: ActionBulkReqDto = {
      datetime,
      type: ActionType.likeSong,
    };
    expect(await service.bulk(dto)).toEqual(action);
  });
});
