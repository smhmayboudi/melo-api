import { Test, TestingModule } from "@nestjs/testing";

import { ConstEventsGateway } from "./const.events.gateway";

describe("ConstEventsGateway", () => {
  let gateway: ConstEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstEventsGateway],
    }).compile();

    gateway = module.get<ConstEventsGateway>(ConstEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
