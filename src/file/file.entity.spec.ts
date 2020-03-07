import { FileEntity } from "./file.entity";

describe("FileEntity", () => {
  it("should be defined", () => {
    expect(new FileEntity(new Date(), "", "", "", 0, "", 0, 0)).toBeDefined();
  });
});
