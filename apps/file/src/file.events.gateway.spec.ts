import { Test, TestingModule } from "@nestjs/testing";

import { FileEventsGateway } from "./file.events.gateway";

describe("FileEventsGateway", () => {
  let gateway: FileEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileEventsGateway],
    }).compile();

    gateway = module.get<FileEventsGateway>(FileEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
