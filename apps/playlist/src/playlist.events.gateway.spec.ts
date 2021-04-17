import { Test, TestingModule } from "@nestjs/testing";

import { PlaylistEventsGateway } from "./playlist.events.gateway";

describe("PlaylistEventsGateway", () => {
  let gateway: PlaylistEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistEventsGateway],
    }).compile();

    gateway = module.get<PlaylistEventsGateway>(PlaylistEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
