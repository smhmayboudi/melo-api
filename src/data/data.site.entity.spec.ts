import { DataSiteEntity } from "./data.site.entity";

describe("DataSiteEntity", () => {
  it("should be defined", () => {
    expect(new DataSiteEntity(new Date(), 0)).toBeDefined();
  });
});
