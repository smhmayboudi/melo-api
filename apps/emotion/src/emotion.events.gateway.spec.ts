import { Test, TestingModule } from "@nestjs/testing";

import { EmotionEventsGateway } from "./emotion.events.gateway";

describe("EmotionEventsGateway", () => {
  let gateway: EmotionEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmotionEventsGateway],
    }).compile();

    gateway = module.get<EmotionEventsGateway>(EmotionEventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect(gateway.handleMessage({})).toEqual(true);
  });
});
