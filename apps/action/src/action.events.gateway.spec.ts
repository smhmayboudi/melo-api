import { Test, TestingModule } from "@nestjs/testing";

import { ActionEventsGateway } from "./action.events.gateway";

describe("ActionEventsGateway", () => {
  let gateway: ActionEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionEventsGateway],
    }).compile();

    gateway = module.get<ActionEventsGateway>(ActionEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
