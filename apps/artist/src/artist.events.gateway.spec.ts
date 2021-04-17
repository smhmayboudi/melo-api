import { Test, TestingModule } from "@nestjs/testing";

import { ArtistEventsGateway } from "./artist.events.gateway";

describe("ArtistEventsGateway", () => {
  let gateway: ArtistEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistEventsGateway],
    }).compile();

    gateway = module.get<ArtistEventsGateway>(ArtistEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
