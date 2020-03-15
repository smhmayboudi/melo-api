// import { TestingModule, Test } from "@nestjs/testing";

import { AppTypeOrmLogger } from "./app.type.orm.logger";

describe("AppTypeOrmLogger", () => {
  it("should be defined", () => {
    expect(new AppTypeOrmLogger()).toBeDefined();
  });

  it("logQuery should be undefined with parameters", () => {
    expect(new AppTypeOrmLogger(["query"]).logQuery("", [""])).toBeUndefined();
  });

  it("logQuery should be undefined", () => {
    expect(new AppTypeOrmLogger(["query"]).logQuery("")).toBeUndefined();
  });

  it("logQuery should be undefined with empty options", () => {
    expect(new AppTypeOrmLogger([]).logQuery("")).toBeUndefined();
  });

  it("logQueryError should be undefined with parameters", () => {
    expect(
      new AppTypeOrmLogger(["error"]).logQueryError("", "", [""])
    ).toBeUndefined();
  });

  it("logQueryError should be undefined", () => {
    expect(
      new AppTypeOrmLogger(["error"]).logQueryError("", "")
    ).toBeUndefined();
  });

  it("logQueryError should be undefined with empty options", () => {
    expect(new AppTypeOrmLogger([]).logQueryError("", "")).toBeUndefined();
  });

  it("logQuerySlow should be undefined with parameters", () => {
    expect(new AppTypeOrmLogger().logQuerySlow(0, "", [""])).toBeUndefined();
  });

  it("logQuerySlow should be undefined", () => {
    expect(new AppTypeOrmLogger().logQuerySlow(0, "")).toBeUndefined();
  });

  it("logSchemaBuild should be undefined", () => {
    expect(new AppTypeOrmLogger(["schema"]).logSchemaBuild("")).toBeUndefined();
  });

  it("logSchemaBuild should be undefined with empty options", () => {
    expect(new AppTypeOrmLogger([]).logSchemaBuild("")).toBeUndefined();
  });

  it("logMigration should be undefined", () => {
    expect(new AppTypeOrmLogger().logMigration("")).toBeUndefined();
  });

  it("log should be undefined level log", () => {
    expect(new AppTypeOrmLogger(["log"]).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level log with empty options", () => {
    expect(new AppTypeOrmLogger([]).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level info", () => {
    expect(new AppTypeOrmLogger(["info"]).log("info", "")).toBeUndefined();
  });

  it("log should be undefined level info with empty options", () => {
    expect(new AppTypeOrmLogger([]).log("info", "")).toBeUndefined();
  });

  it("log should be undefined level warn", () => {
    expect(new AppTypeOrmLogger(["warn"]).log("warn", "")).toBeUndefined();
  });

  it("log should be undefined level warn with empty options", () => {
    expect(new AppTypeOrmLogger([]).log("warn", "")).toBeUndefined();
  });

  it("stringifyParams should be equal to a value", () => {
    expect(new AppTypeOrmLogger().stringifyParams([0])).toEqual("[0]");
  });

  it.todo("stringifyParams should throw an exception");
});
