import typeorm from "typeorm";
import { Logger } from "@nestjs/common";
import util from "util";

// export class AppTypeOrmLogger implements typeorm.Logger {
export default {
  logQuery(
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.log(
      `${query} => ${parameters} => ${queryRunner}`,
      "AppTypeOrmLogger"
    );
    Logger.log(util.format(query, parameters, queryRunner), "AppTypeOrmLogger");
  },
  logQueryError(
    error: string,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.error(
      `${error} => ${query} => ${parameters} => ${queryRunner}`,
      undefined,
      "AppTypeOrmLogger"
    );
    Logger.error(
      util.format(error, query, parameters, queryRunner),
      undefined,
      "AppTypeOrmLogger"
    );
  },
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.log(
      `${time} => ${query} => ${parameters} => ${queryRunner}`,
      "AppTypeOrmLogger"
    );
    Logger.log(
      util.format(time, query, parameters, queryRunner),
      "AppTypeOrmLogger"
    );
  },
  logSchemaBuild(
    message: string,
    queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.log(`${message} => ${queryRunner}`, "AppTypeOrmLogger");
    Logger.log(util.format(message, queryRunner), "AppTypeOrmLogger");
  },
  logMigration(
    message: string,
    queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    Logger.log(`${message} => ${queryRunner}`, "AppTypeOrmLogger");
    Logger.log(util.format(message, queryRunner), "AppTypeOrmLogger");
  },
  log(
    level: "log" | "info" | "warn",
    message: any,
    queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    switch (level) {
      case "info":
        Logger.log(`info: ${message} => ${queryRunner}`, "AppTypeOrmLogger");
        Logger.log(util.format(message, queryRunner), "AppTypeOrmLogger");
        break;
      case "log":
        Logger.log(`log: ${message} => ${queryRunner}`, "AppTypeOrmLogger");
        Logger.log(util.format(message, queryRunner), "AppTypeOrmLogger");
        break;
      case "warn":
        Logger.log(`warn: ${message} => ${queryRunner}`, "AppTypeOrmLogger");
        Logger.log(util.format(message, queryRunner), "AppTypeOrmLogger");
        break;
    }
  }
};
