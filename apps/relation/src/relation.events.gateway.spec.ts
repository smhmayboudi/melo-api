import { Test, TestingModule } from "@nestjs/testing";

import { RelationEventsGateway } from "./relation.events.gateway";

describe("RelationEventsGateway", () => {
  let gateway: RelationEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationEventsGateway],
    }).compile();

    gateway = module.get<RelationEventsGateway>(RelationEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
