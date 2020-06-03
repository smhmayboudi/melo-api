import { ActionBulkReqDto, ActionType } from "@melo/common";

import { ActionService } from "./action.service";
import { Test } from "@nestjs/testing";

describe("ActionService", () => {
  const datetime = new Date().toString();
  const action: ActionBulkReqDto = {
    datetime,
    type: ActionType.likeSong,
  };

  let service: ActionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ActionService],
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
