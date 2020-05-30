import { DataTypeOrmLogger } from "./data.type.orm.logger";

describe("DataTypeOrmLogger", () => {
  it("should be defined", () => {
    expect(new DataTypeOrmLogger()).toBeDefined();
  });

  it("logQuery should be undefined with parameters", () => {
    expect(new DataTypeOrmLogger(["query"]).logQuery("", [""])).toBeUndefined();
  });

  it("logQuery should be undefined", () => {
    expect(new DataTypeOrmLogger(["query"]).logQuery("")).toBeUndefined();
  });

  it("logQuery should be undefined with empty options", () => {
    expect(new DataTypeOrmLogger([]).logQuery("")).toBeUndefined();
  });

  it("logQueryError should be undefined with parameters", () => {
    expect(
      new DataTypeOrmLogger(["error"]).logQueryError("", "", [""])
    ).toBeUndefined();
  });

  it("logQueryError should be undefined", () => {
    expect(
      new DataTypeOrmLogger(["error"]).logQueryError("", "")
    ).toBeUndefined();
  });

  it("logQueryError should be undefined with empty options", () => {
    expect(new DataTypeOrmLogger([]).logQueryError("", "")).toBeUndefined();
  });

  it("logQuerySlow should be undefined with parameters", () => {
    expect(new DataTypeOrmLogger().logQuerySlow(0, "", [""])).toBeUndefined();
  });

  it("logQuerySlow should be undefined", () => {
    expect(new DataTypeOrmLogger().logQuerySlow(0, "")).toBeUndefined();
  });

  it("logSchemaBuild should be undefined", () => {
    expect(
      new DataTypeOrmLogger(["schema"]).logSchemaBuild("")
    ).toBeUndefined();
  });

  it("logSchemaBuild should be undefined with empty options", () => {
    expect(new DataTypeOrmLogger([]).logSchemaBuild("")).toBeUndefined();
  });

  it("logMigration should be undefined", () => {
    expect(new DataTypeOrmLogger().logMigration("")).toBeUndefined();
  });

  it("log should be undefined level log", () => {
    expect(new DataTypeOrmLogger(["log"]).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level log with empty options", () => {
    expect(new DataTypeOrmLogger([]).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level info", () => {
    expect(new DataTypeOrmLogger(["info"]).log("info", "")).toBeUndefined();
  });

  it("log should be undefined level info with empty options", () => {
    expect(new DataTypeOrmLogger([]).log("info", "")).toBeUndefined();
  });

  it("log should be undefined level warn", () => {
    expect(new DataTypeOrmLogger(["warn"]).log("warn", "")).toBeUndefined();
  });

  it("log should be undefined level warn with empty options", () => {
    expect(new DataTypeOrmLogger([]).log("warn", "")).toBeUndefined();
  });
});
