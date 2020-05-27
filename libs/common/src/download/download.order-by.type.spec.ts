import { DownloadOrderByType } from "./download.order-by.type";

describe("DownloadOrderByType", () => {
  it("should be equal to download order by type", () => {
    expect(DownloadOrderByType).toStrictEqual({
      asc: "asc",
      desc: "desc",
    });
  });
});
