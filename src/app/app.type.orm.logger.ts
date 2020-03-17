import { Logger } from "@nestjs/common";
import typeorm from "typeorm";

export class AppTypeOrmLogger implements typeorm.Logger {
  private readonly options?:
    | boolean
    | "all"
    | ("log" | "info" | "warn" | "query" | "schema" | "error" | "migration")[]
    | undefined;

  constructor(
    options?:
      | boolean
      | "all"
      | ("log" | "info" | "warn" | "query" | "schema" | "error" | "migration")[]
      | undefined
  ) {
    this.options = options;
  }

  logQuery(
    query: string,
    parameters?: any[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("query"))
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? " -- PARAMETERS: " + this.stringifyParams(parameters)
          : "");
      Logger.log(`query: ${sql}`, "AppTypeOrmLogger");
    }
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("error"))
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? " -- PARAMETERS: " + this.stringifyParams(parameters)
          : "");
      Logger.error(
        `query failed: ${sql}, with error: ${error}`,
        undefined,
        "AppTypeOrmLogger"
      );
    }
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    const sql =
      query +
      (parameters && parameters.length
        ? " -- PARAMETERS: " + this.stringifyParams(parameters)
        : "");
    Logger.log(
      `query is slow: ${sql}, with execution time: ${time}`,
      "AppTypeOrmLogger"
    );
  }

  logSchemaBuild(
    message: string,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      (this.options instanceof Array && this.options.includes("schema"))
    ) {
      Logger.log(message, "AppTypeOrmLogger");
    }
  }

  logMigration(
    message: string,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.log(message, "AppTypeOrmLogger");
  }

  log(
    level: "log" | "info" | "warn",
    message: any,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    switch (level) {
      case "log":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("log"))
        )
          Logger.log(message, "AppTypeOrmLogger");
        break;
      case "info":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("info"))
        )
          Logger.log(`INFO: ${message}`, "AppTypeOrmLogger");
        break;
      case "warn":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("warn"))
        )
          Logger.warn(message, "AppTypeOrmLogger");
        break;
    }
  }

  stringifyParams(parameters: any[]): any {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      return parameters;
    }
  }
}
