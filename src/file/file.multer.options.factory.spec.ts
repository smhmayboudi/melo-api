import { FileMulterOptionsFactory } from "./file.multer.options.factory";

describe("FileMulterOptionsFactory", () => {
  it("should be defined", () => {
    expect(new FileMulterOptionsFactory()).toBeDefined();
  });
});
