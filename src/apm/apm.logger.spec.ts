import { ApmLogger } from "./apm.logger";

describe("ApmLogger", () => {
  it("should be defined", () => {
    expect(new ApmLogger()).toBeDefined();
  });
});
