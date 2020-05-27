import { AtEntity } from "./at.entity";

describe("AtEntity", () => {
  it("should be defined", () => {
    expect(new AtEntity(0, new Date(), new Date(), 0, 0, "")).toBeDefined();
  });
});
