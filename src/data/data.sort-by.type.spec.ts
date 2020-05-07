import { DataSortByType } from "./data.sort-by.type";

describe("DataSortByType", () => {
  it("should be equal to data orderby type", () => {
    expect(DataSortByType).toStrictEqual({
      asc: "ASC",
      desc: "DESC",
    });
  });
});
