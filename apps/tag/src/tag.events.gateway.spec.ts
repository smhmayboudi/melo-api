import { Test, TestingModule } from "@nestjs/testing";

import { TagEventsGateway } from "./tag.events.gateway";

describe("AtEventsGateway", () => {
  let gateway: TagEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagEventsGateway],
    }).compile();

    gateway = module.get<TagEventsGateway>(TagEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
