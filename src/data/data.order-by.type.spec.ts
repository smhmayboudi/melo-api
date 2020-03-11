import { DataOrderByType } from "./data.order-by.type";

describe("DataOrderByType", () => {
  it("should equal to datat orderby type", () => {
    expect(DataOrderByType).toStrictEqual({
      downloads: "downloads",
      release: "release"
    });
  });
});
