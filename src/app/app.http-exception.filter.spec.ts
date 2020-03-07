import { AppHttpExceptionFilter } from "./app.http-exception.filter";

describe("HttpExceptionFilter", () => {
  it("should be defined", () => {
    expect(new AppHttpExceptionFilter()).toBeDefined();
  });
});
