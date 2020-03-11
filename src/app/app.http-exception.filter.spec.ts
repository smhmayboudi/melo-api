import { AppHttpExceptionFilter } from "./app.http-exception.filter";

describe("HttpExceptionFilter", () => {
  const host: any = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn(() => ({ method: "", route: { path: "" } })),
    getResponse: jest.fn(() => ({ status: () => ({ json: () => ({}) }) }))
  };
  const exception: any = {
    getStatus: jest.fn(() => 200)
  };

  it("should be defined", () => {
    expect(new AppHttpExceptionFilter()).toBeDefined();
  });

  it("catch should be undefined", () => {
    expect(new AppHttpExceptionFilter().catch(exception, host)).toBeUndefined();
    expect(host.switchToHttp).toHaveBeenCalled();
    expect(host.getRequest).toHaveBeenCalled();
    expect(host.getResponse).toHaveBeenCalled();
    expect(exception.getStatus).toHaveBeenCalled();
  });
});
