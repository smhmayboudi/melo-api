import { DataSortByType } from "./search.sort-by.type";

describe("SearchSortByType", () => {
  it("should be equal to data order by type", () => {
    expect(DataSortByType).toStrictEqual({
      asc: "ASC",
      desc: "DESC",
    });
  });
});
