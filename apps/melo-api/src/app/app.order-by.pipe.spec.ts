import { AppOrderByPipe } from "./app.order-by.pipe";
import { SongOrderByType } from "@melo/common";

describe("AppOrderByPipe", () => {
  it("should be defined", () => {
    expect(new AppOrderByPipe()).toBeDefined();
  });

  it("transform should be equal to a value downloads", () => {
    expect(
      new AppOrderByPipe().transform("downloads", {
        type: "body",
      })
    ).toEqual(SongOrderByType.downloads);
  });

  it("transform should be equal to a value release", () => {
    expect(
      new AppOrderByPipe().transform("release", {
        type: "body",
      })
    ).toEqual(SongOrderByType.release);
  });

  it("transform should throw an error to a value unknown", () => {
    expect(() =>
      new AppOrderByPipe().transform("", {
        type: "body",
      })
    ).toThrowError();
  });

  it("transform should throw an error to a value not string", () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      new AppOrderByPipe().transform(0, {
        type: "body",
      })
    ).toThrowError();
  });

  it.todo("transform should throw an error on typeof !== string");
});
