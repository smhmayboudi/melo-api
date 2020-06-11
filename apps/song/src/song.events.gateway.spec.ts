import { Test, TestingModule } from "@nestjs/testing";

import { SongEventsGateway } from "./song.events.gateway";

describe("SongEventsGateway", () => {
  let gateway: SongEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongEventsGateway],
    }).compile();

    gateway = module.get<SongEventsGateway>(SongEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
