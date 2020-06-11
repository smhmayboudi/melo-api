import { Test, TestingModule } from "@nestjs/testing";

import { AlbumEventsGateway } from "./album.events.gateway";

describe("AlbumEventsGateway", () => {
  let gateway: AlbumEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumEventsGateway],
    }).compile();

    gateway = module.get<AlbumEventsGateway>(AlbumEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
