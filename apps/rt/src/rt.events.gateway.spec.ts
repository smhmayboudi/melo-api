import { Test, TestingModule } from "@nestjs/testing";

import { RtEventsGateway } from "./rt.events.gateway";

describe("RtEventsGateway", () => {
  let gateway: RtEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtEventsGateway],
    }).compile();

    gateway = module.get<RtEventsGateway>(RtEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
