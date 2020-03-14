import { DownloadSortByPipe } from "./download.sort-by.pipe";
import { DownloadSortByType } from "./download.sort-by.type";

describe("DownloadSortByPipe", () => {
  it("should be defined", () => {
    expect(new DownloadSortByPipe()).toBeDefined();
  });

  it("transform should return orderBy type", () => {
    expect(
      new DownloadSortByPipe().transform("date", { type: "body" })
    ).toEqual(DownloadSortByType.date);
  });

  it("transform should throw bad request error", () => {
    return expect(
      new DownloadSortByPipe().transform("", { type: "body" })
    ).rejects.toThrowError();
  });
});
