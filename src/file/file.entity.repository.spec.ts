import { FileEntityRepository } from "./file.entity.repository";

describe("FileEntityRepository", () => {
  it("should be defined", () => {
    expect(new FileEntityRepository()).toBeDefined();
  });
});
