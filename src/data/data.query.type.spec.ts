import { DataQueryType } from "./data.query.type";

describe("DataQueryType", () => {
  it("should be equal to data orderby type", () => {
    expect(DataQueryType).toStrictEqual({
      new: "new",
      podcast: "podcast",
      topDay: "top-day",
      topWeek: "top-week",
    });
  });
});
