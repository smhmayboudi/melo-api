import { TagEntity } from "./tag.entity";

describe("TagEntity", () => {
  it("should be defined", () => {
    expect(new TagEntity(0, "", 0, "")).toBeDefined();
  });
});
