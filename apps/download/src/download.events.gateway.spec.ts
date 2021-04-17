import { Test, TestingModule } from "@nestjs/testing";

import { DownloadEventsGateway } from "./download.events.gateway";

describe("DownloadEventsGateway", () => {
  let gateway: DownloadEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadEventsGateway],
    }).compile();

    gateway = module.get<DownloadEventsGateway>(DownloadEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
