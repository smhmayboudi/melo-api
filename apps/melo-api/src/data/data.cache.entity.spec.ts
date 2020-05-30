import { DataCacheEntity } from "./data.cache.entity";

describe("DataCacheEntity", () => {
  it("should be defined", () => {
    expect(new DataCacheEntity(0, new Date(), "", "")).toBeDefined();
  });
});
