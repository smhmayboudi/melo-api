import { AnonymUUIDStrategy } from "./anonym-uuid.strategy";

describe("AnonymUUIDStrategy", () => {
  it("should be defined", () => {
    expect(new AnonymUUIDStrategy()).toBeDefined();
  });

  it("validate should be equal to a sub", async () => {
    expect(await new AnonymUUIDStrategy().validate()).toEqual({
      sub: "0"
    });
  });
});
