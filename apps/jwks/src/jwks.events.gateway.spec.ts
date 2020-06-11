import { Test, TestingModule } from "@nestjs/testing";

import { JwksEventsGateway } from "./jwks.events.gateway";

describe("JwksEventsGateway", () => {
  let gateway: JwksEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwksEventsGateway],
    }).compile();

    gateway = module.get<JwksEventsGateway>(JwksEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
