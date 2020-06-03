import { Logger } from "@nestjs/common";
import typeorm from "typeorm";

export class CommonTypeOrmLogger implements typeorm.Logger {
  private readonly options?:
    | boolean
    | "all"
    | ("log" | "info" | "warn" | "query" | "schema" | "error" | "migration")[]
    | undefined;

  private query(query: string, parameters: unknown[] | undefined): string {
    return `${query}${
      parameters !== undefined && parameters.length !== 0
        ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
        : ""
    }`;
  }

  private stringifyParams(parameters: unknown[]): unknown {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      return parameters;
    }
  }

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
    parameters?: unknown[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("query"))
    ) {
      Logger.log(`query: ${this.query(query, parameters)}`, "AppTypeOrmLogger");
    }
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: unknown[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("error"))
    ) {
      Logger.error(
        `query failed: ${this.query(query, parameters)}, with error: ${error}`,
        undefined,
        "AppTypeOrmLogger"
      );
    }
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.log(
      `query is slow: ${this.query(
        query,
        parameters
      )}, with execution time: ${time}`,
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
    message: unknown,
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
}
