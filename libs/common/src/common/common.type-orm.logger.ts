import { COMMON, COMMON_TYPEORM_LOGGER } from "./common.token";

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
      Logger.log(
        `query: ${this.query(query, parameters)}`,
        COMMON_TYPEORM_LOGGER
      );
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
        COMMON,
        COMMON_TYPEORM_LOGGER
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
      COMMON_TYPEORM_LOGGER
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
      Logger.log(message, COMMON_TYPEORM_LOGGER);
    }
  }

  logMigration(
    message: string,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.log(message, COMMON_TYPEORM_LOGGER);
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
          Logger.log(message, COMMON_TYPEORM_LOGGER);
        break;
      case "info":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("info"))
        )
          Logger.log(`INFO: ${message}`, COMMON_TYPEORM_LOGGER);
        break;
      case "warn":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("warn"))
        )
          Logger.warn(message, COMMON_TYPEORM_LOGGER);
        break;
    }
  }
}
