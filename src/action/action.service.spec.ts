import { Test, TestingModule } from "@nestjs/testing";
import { ActionService } from "./action.service";
import { ActionType } from "./action.type";
import { ActionDto } from "./dto/action.dto";

describe("ActionService", () => {
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

  it("bulk should be defined", async () => {
    const req: ActionDto = {
      datetime: new Date().toString(),
      type: ActionType.likeSong
    };
    expect(await service.bulk(req)).toBeDefined();
  });
});
