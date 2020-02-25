import { RtEntity } from "./rt.entity";

describe("RtEntity", () => {
  it("should be defined", () => {
    expect(
      new RtEntity(new Date(), "", new Date(), 0, false, 0, "")
    ).toBeDefined();
  });
});
