import { ACTION_SERVICE, ActionBulkReqDto, ActionType } from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { ActionService } from "./action.service";

describe("ActionService", () => {
  const datetime = new Date().toString();
  const action: ActionBulkReqDto = {
    datetime,
    type: ActionType.likeSong,
  };

  // TODO: interface ?
  const clientProxyMock = {
    send: (): Observable<ActionBulkReqDto> => of(action),
  };

  let service: ActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionService,
        {
          provide: ACTION_SERVICE,
          useValue: clientProxyMock,
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
