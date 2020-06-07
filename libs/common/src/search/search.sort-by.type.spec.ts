import { SearchSortByType } from "./search.sort-by.type";

describe("SearchSortByType", () => {
  it("should be equal to data order by type", () => {
    expect(SearchSortByType).toStrictEqual({
      asc: "ASC",
      desc: "DESC",
    });
  });
});
