import { DownloadSortByType } from "./download.sort-by.type";

describe("DownloadSortByType", () => {
  it("should be equal to download order by type", () => {
    expect(DownloadSortByType).toStrictEqual({
      date: "date",
    });
  });
});
