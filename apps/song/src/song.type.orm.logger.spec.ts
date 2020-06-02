import { SongTypeOrmLogger } from "./song.type.orm.logger";

describe("SongTypeOrmLogger", () => {
  it("should be defined", () => {
    expect(new SongTypeOrmLogger()).toBeDefined();
  });

  it("logQuery should be undefined with parameters", () => {
    expect(new SongTypeOrmLogger(["query"]).logQuery("", [""])).toBeUndefined();
  });

  it("logQuery should be undefined", () => {
    expect(new SongTypeOrmLogger(["query"]).logQuery("")).toBeUndefined();
  });

  it("logQuery should be undefined with empty options", () => {
    expect(new SongTypeOrmLogger([]).logQuery("")).toBeUndefined();
  });

  it("logQueryError should be undefined with parameters", () => {
    expect(
      new SongTypeOrmLogger(["error"]).logQueryError("", "", [""])
    ).toBeUndefined();
  });

  it("logQueryError should be undefined", () => {
    expect(
      new SongTypeOrmLogger(["error"]).logQueryError("", "")
    ).toBeUndefined();
  });

  it("logQueryError should be undefined with empty options", () => {
    expect(new SongTypeOrmLogger([]).logQueryError("", "")).toBeUndefined();
  });

  it("logQuerySlow should be undefined with parameters", () => {
    expect(new SongTypeOrmLogger().logQuerySlow(0, "", [""])).toBeUndefined();
  });

  it("logQuerySlow should be undefined", () => {
    expect(new SongTypeOrmLogger().logQuerySlow(0, "")).toBeUndefined();
  });

  it("logSchemaBuild should be undefined", () => {
    expect(
      new SongTypeOrmLogger(["schema"]).logSchemaBuild("")
    ).toBeUndefined();
  });

  it("logSchemaBuild should be undefined with empty options", () => {
    expect(new SongTypeOrmLogger([]).logSchemaBuild("")).toBeUndefined();
  });

  it("logMigration should be undefined", () => {
    expect(new SongTypeOrmLogger().logMigration("")).toBeUndefined();
  });

  it("log should be undefined level log", () => {
    expect(new SongTypeOrmLogger(["log"]).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level log with empty options", () => {
    expect(new SongTypeOrmLogger([]).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level info", () => {
    expect(new SongTypeOrmLogger(["info"]).log("info", "")).toBeUndefined();
  });

  it("log should be undefined level info with empty options", () => {
    expect(new SongTypeOrmLogger([]).log("info", "")).toBeUndefined();
  });

  it("log should be undefined level warn", () => {
    expect(new SongTypeOrmLogger(["warn"]).log("warn", "")).toBeUndefined();
  });

  it("log should be undefined level warn with empty options", () => {
    expect(new SongTypeOrmLogger([]).log("warn", "")).toBeUndefined();
  });
});
