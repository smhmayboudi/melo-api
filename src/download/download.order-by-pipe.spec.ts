import { DownloadOrderByPipe } from "./download.order-by.pipe";
import { DownloadOrderByType } from "./download.order-by.type";

describe("DownloadOrderByPipe", () => {
  it("should be defined", () => {
    expect(new DownloadOrderByPipe()).toBeDefined();
  });

  it("transform should return orderBy type asc", () => {
    expect(
      new DownloadOrderByPipe().transform("asc", { type: "body" })
    ).toEqual(DownloadOrderByType.asc);
  });

  it("transform should return orderBy type desc", () => {
    expect(
      new DownloadOrderByPipe().transform("desc", { type: "body" })
    ).toEqual(DownloadOrderByType.desc);
  });

  it("transform should throw bad request error value not string", () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      new DownloadOrderByPipe().transform(0, { type: "body" })
    ).toThrowError();
  });

  it("transform should throw bad request error", () => {
    expect(() =>
      new DownloadOrderByPipe().transform("", { type: "body" })
    ).toThrowError();
  });

  it.todo("transform should throw an exception on typeof !== string");
});
