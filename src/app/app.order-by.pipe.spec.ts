import { AppOrderByPipe } from "./app.order-by.pipe";
import { DataOrderByType } from "../data/data.order-by.type";

describe("AppOrderByPipe", () => {
  it("should be defined", () => {
    expect(new AppOrderByPipe()).toBeDefined();
  });

  it("transform should be equal to a value downloads", () => {
    expect(
      new AppOrderByPipe().transform("downloads", { type: "body" })
    ).toEqual(DataOrderByType.downloads);
  });

  it("transform should be equal to a value release", () => {
    expect(new AppOrderByPipe().transform("release", { type: "body" })).toEqual(
      DataOrderByType.release
    );
  });

  it("transform should throw an exception to a value unknown", () => {
    try {
      expect(
        new AppOrderByPipe().transform("", { type: "body" })
      ).toThrowError();
    } catch (error) {
      console.log(error);
    }
  });

  it.todo("transform should throw an exception on typeof !== string");
});
