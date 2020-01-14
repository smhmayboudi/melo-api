import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, _response: Response, next: Function) {
    Logger.log(`request: ${request.path}`, "logger.middleware");
    next();
  }
}
