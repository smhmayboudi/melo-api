import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ActionServiceInterface } from "./action.service.interface";
import { ActionType } from "./action.type";
import { ActionDto } from "./dto/action.dto";

describe("ActionController", () => {
  const datetime = new Date().toString();
  const action: ActionDto = {
    datetime,
    type: ActionType.likeSong
  };

  const actionServiceMock: ActionServiceInterface = {
    bulk: (): Promise<ActionDto> => Promise.resolve(action)
  };
  const appHashIdServiceMock: AppHashIdServiceInterface = {
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

  it("bulk should equal to an action", async () => {
    const dto: ActionDto = {
      datetime: new Date().toString(),
      type: ActionType.likeSong
    };
    expect(await controller.bulk(dto)).toBeDefined();
  });
});
