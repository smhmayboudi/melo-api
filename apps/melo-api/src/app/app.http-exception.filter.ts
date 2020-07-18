import * as express from "express";

import { APP_SERVICE, AuthJwtPayloadReqDto } from "@melo/common";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";

@Catch(HttpException)
export class AppHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    const response = ctx.getResponse<express.Response>();
    const status = exception.getStatus();
    Logger.error(
      `${JSON.stringify({
        path: request.path,
        user: request.user,
      })} => ${exception}`,
      "AppHttpExceptionFilter",
      APP_SERVICE
    );
    response.status(status).json({
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
