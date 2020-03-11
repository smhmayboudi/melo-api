import { Test, TestingModule } from "@nestjs/testing";
import { ActionService } from "./action.service";
import { ActionType } from "./action.type";
import { ActionDto } from "./dto/action.dto";

describe("ActionService", () => {
  const datetime = new Date().toString();
  const action: ActionDto = {
    datetime,
    type: ActionType.likeSong
  };

  let service: ActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionService]
    }).compile();
    service = module.get<ActionService>(ActionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("bulk should be equal to an action", async () => {
    const dto: ActionDto = {
      datetime,
      type: ActionType.likeSong
    };
    expect(await service.bulk(dto)).toEqual(action);
  });
});
