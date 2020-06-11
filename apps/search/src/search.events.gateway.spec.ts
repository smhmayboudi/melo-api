import { Test, TestingModule } from "@nestjs/testing";

import { SearchEventsGateway } from "./search.events.gateway";

describe("SearchEventsGateway", () => {
  let gateway: SearchEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchEventsGateway],
    }).compile();

    gateway = module.get<SearchEventsGateway>(SearchEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
