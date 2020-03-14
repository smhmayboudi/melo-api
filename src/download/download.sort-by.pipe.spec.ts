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
    expect(() =>
      new DownloadSortByPipe().transform("", { type: "body" })
    ).toThrowError();
  });

  it("transform should throw bad request error value not string", () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      new DownloadSortByPipe().transform(0, { type: "body" })
    ).toThrowError();
  });

  it.todo("transform should throw an exception on typeof !== string");
});
