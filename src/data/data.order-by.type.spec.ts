import { DataOrderByType } from "./data.order-by.type";

describe("DataOrderByType", () => {
  it("should be defined", () => {
    expect(DataOrderByType).toStrictEqual({
      downloads: "downloads",
      release: "release"
    });
  });
});
