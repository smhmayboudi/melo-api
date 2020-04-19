/* eslint-disable @typescript-eslint/ban-ts-ignore */

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

  it("transform should throw an error", () => {
    expect(() =>
      new DownloadSortByPipe().transform("", { type: "body" })
    ).toThrowError();
  });

  it("transform should throw an error value not string", () => {
    expect(() =>
      // @ts-ignore
      new DownloadSortByPipe().transform(0, { type: "body" })
    ).toThrowError();
  });

  it.todo("transform should throw an error on typeof !== string");
});
