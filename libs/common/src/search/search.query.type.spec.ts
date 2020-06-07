import { SearchQueryType } from "./search.query.type";

describe("SearchQueryType", () => {
  it("should be equal to data order by type", () => {
    expect(SearchQueryType).toStrictEqual({
      new: "new",
      podcast: "podcast",
      topDay: "top-day",
      topWeek: "top-week",
    });
  });
});
