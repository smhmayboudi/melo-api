import { FileMulterOptionsFactory } from "./file.multer.options.factory";

describe("FileMulterOptionsFactory", () => {
  it("should be defined", () => {
    expect(new FileMulterOptionsFactory()).toBeDefined();
  });

  it("createMulterOptions should be equal to a storage", () => {
    expect(new FileMulterOptionsFactory().createMulterOptions()).toEqual({
      storage: {},
    });
  });
});
