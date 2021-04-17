import { TagRelationEntity } from "./tag-relation.entity";

describe("TagRelationEntity", () => {
  it("should be defined", () => {
    expect(new TagRelationEntity(0, "", 0, 0)).toBeDefined();
  });
});
