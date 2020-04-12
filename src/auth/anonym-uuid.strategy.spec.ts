import { AnonymUUIDStrategy } from "./anonym-uuid.strategy";

describe("AnonymUUIDStrategy", () => {
  it("should be defined", () => {
    expect(new AnonymUUIDStrategy()).toBeDefined();
  });

  it("validate should be equal to a sub authorization undefined", async () => {
    expect(await new AnonymUUIDStrategy().validate(undefined)).toEqual({
      sub: "0",
    });
  });

  it("validate should throw an unauthorized exception to non undefined authorization", async () => {
    return expect(new AnonymUUIDStrategy().validate("")).rejects.toThrowError();
  });
});
