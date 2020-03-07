import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  use(request: Request, _response: Response, next: Function): void {
    Logger.log(
      `${JSON.stringify({ path: request.path, user: request.user })} => ...`,
      "AppLoggerMiddleware"
    );
    next();
  }
}
