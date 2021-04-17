import { TagEntityRepository } from "./tag.entity.repository";

describe("TagEntityRepository", () => {
  it("should be defined", () => {
    expect(new TagEntityRepository()).toBeDefined();
  });
});
